const crypto = require("crypto");
const express = require("express");
const { stripeGet, clearPlansCache } = require("./plans");

const router = express.Router();

// Admin API used by the app.liefro.de dashboard to list, add and remove the
// pricing packages. Packages are Stripe products (see routes/plans.js for the
// metadata the pricing page reads): adding one creates the Stripe product with
// its monthly and/or yearly recurring price, removing one archives it.
// Every request must send the shared key from PACKAGES_API_KEY in `x-api-key`.
function requireApiKey(req, res, next) {
  const expected = process.env.PACKAGES_API_KEY || "";
  const given = String(req.get("x-api-key") || "");
  const ok =
    expected.length > 0 &&
    given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));

  if (!ok) return res.status(401).json({ success: false, message: "Unauthorized." });
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ success: false, message: "Stripe is not configured." });
  }
  return next();
}

router.use(requireApiKey);

async function stripePost(path, params) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Stripe API error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

const META_MAX = 500; // Stripe limit per metadata value

// Features may come as an array or as text with one feature per line.
// "|" separates features in the metadata, so it is removed from the text.
const toList = (value) =>
  (Array.isArray(value) ? value : String(value || "").split(/\r?\n/))
    .map((f) => String(f).replace(/\|/g, " ").trim())
    .filter(Boolean);

const splitFeatures = (value) =>
  String(value || "")
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean);

const toPrice = (value) => {
  if (value === undefined || value === null || String(value).trim() === "") return null;
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : NaN;
};

const toBool = (value) => value === true || value === "true" || value === "1" || value === 1 || value === "on";

// Current monthly / yearly price of a product, picked like the pricing page does.
function pickPrice(product, prices, interval) {
  const options = prices
    .filter(
      (p) =>
        p.product === product.id &&
        p.recurring?.interval === interval &&
        p.recurring.interval_count === 1 &&
        p.unit_amount != null
    )
    .sort((a, b) => b.created - a.created);
  return options.find((p) => p.id === product.default_price) || options[0] || null;
}

function toPackage(product, prices) {
  const meta = product.metadata || {};
  const month = pickPrice(product, prices, "month");
  const year = pickPrice(product, prices, "year");
  return {
    id: product.id,
    nameDe: meta.name_de || product.name,
    nameEn: meta.name_en || "",
    taglineDe: meta.tagline_de || "",
    taglineEn: meta.tagline_en || "",
    featuresDe: splitFeatures(meta.features_de),
    featuresEn: splitFeatures(meta.features_en),
    priceMonth: month ? month.unit_amount / 100 : null,
    priceYear: year ? year.unit_amount / 100 : null,
    currency: ((month || year)?.currency || "eur").toUpperCase(),
    devices: Number(meta.devices) || null,
    popular: meta.popular === "true",
    order: Number(meta.order) || 0,
    active: meta.show_on_pricing === "true",
    created: product.created,
  };
}

// All pricing packages: active Stripe products that carry the show_on_pricing
// flag (true = shown on liefro.com, false = hidden).
router.get("/", async (req, res) => {
  try {
    const [{ data: products }, { data: prices }] = await Promise.all([
      stripeGet("products?active=true&limit=100"),
      stripeGet("prices?active=true&type=recurring&limit=100"),
    ]);
    const packages = products
      .filter((p) => p.metadata && p.metadata.show_on_pricing !== undefined)
      .map((p) => toPackage(p, prices))
      .sort((a, b) => a.order - b.order || a.created - b.created);
    return res.json({ success: true, packages });
  } catch (error) {
    console.error("Packages list error:", error);
    return res.status(502).json({ success: false, message: "Could not load packages from Stripe." });
  }
});

router.post("/", async (req, res) => {
  const body = req.body || {};
  const nameDe = String(body.nameDe || "").trim();
  const priceMonth = toPrice(body.priceMonth);
  const priceYear = toPrice(body.priceYear);

  if (!nameDe) {
    return res.status(400).json({ success: false, message: "Name (DE) is required." });
  }
  if (Number.isNaN(priceMonth) || Number.isNaN(priceYear)) {
    return res.status(400).json({ success: false, message: "Prices must be valid numbers." });
  }
  if (priceMonth === null && priceYear === null) {
    return res.status(400).json({ success: false, message: "Enter a monthly or a yearly price." });
  }
  if ((priceMonth !== null && priceMonth < 0.5) || (priceYear !== null && priceYear < 0.5)) {
    return res.status(400).json({ success: false, message: "Prices must be at least 0.50." });
  }

  const meta = {
    show_on_pricing: body.active === undefined || toBool(body.active) ? "true" : "false",
    name_de: nameDe,
    name_en: String(body.nameEn || "").trim(),
    tagline_de: String(body.taglineDe || "").trim(),
    tagline_en: String(body.taglineEn || "").trim(),
    features_de: toList(body.featuresDe).join("|"),
    features_en: toList(body.featuresEn).join("|"),
    devices: Number(body.devices) > 0 ? String(Math.floor(Number(body.devices))) : "",
    popular: toBool(body.popular) ? "true" : "false",
    order: String(Number.isFinite(Number(body.order)) ? Number(body.order) : 0),
  };
  const tooLong = Object.keys(meta).find((k) => meta[k].length > META_MAX);
  if (tooLong) {
    return res.status(400).json({
      success: false,
      message: `"${tooLong}" is too long (max ${META_MAX} characters). Please shorten it.`,
    });
  }

  const currency = String(body.currency || "EUR").trim().toLowerCase() || "eur";
  let product;
  try {
    const productParams = { name: nameDe };
    Object.keys(meta).forEach((k) => {
      productParams[`metadata[${k}]`] = meta[k];
    });
    product = await stripePost("products", productParams);

    const createPrice = (amount, interval) =>
      stripePost("prices", {
        product: product.id,
        currency,
        unit_amount: String(Math.round(amount * 100)),
        "recurring[interval]": interval,
        nickname: `${nameDe} (${interval === "month" ? "monthly" : "yearly"})`,
      });

    const month = priceMonth !== null ? await createPrice(priceMonth, "month") : null;
    const year = priceYear !== null ? await createPrice(priceYear, "year") : null;
    await stripePost(`products/${product.id}`, { default_price: (month || year).id });

    clearPlansCache();
    return res.status(201).json({ success: true, package: { id: product.id } });
  } catch (error) {
    console.error("Package create error:", error);
    // Don't leave a half-created package behind
    if (product) {
      await stripePost(`products/${product.id}`, { active: "false", "metadata[show_on_pricing]": "false" }).catch(() => {});
    }
    return res.status(502).json({ success: false, message: "Could not create the package in Stripe." });
  }
});

// Removes a package from the pricing page by archiving its Stripe product.
// Stripe does not delete products that have prices; existing subscriptions keep running.
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!/^prod_[A-Za-z0-9]+$/.test(id)) {
    return res.status(400).json({ success: false, message: "Invalid package id." });
  }

  try {
    const product = await stripeGet(`products/${id}`);
    if (!product.metadata || product.metadata.show_on_pricing === undefined) {
      return res.status(404).json({ success: false, message: "Package not found." });
    }
    await stripePost(`products/${id}`, { active: "false", "metadata[show_on_pricing]": "false" });
    clearPlansCache();
    return res.json({ success: true });
  } catch (error) {
    console.error("Package delete error:", error);
    return res.status(502).json({ success: false, message: "Could not remove the package in Stripe." });
  }
});

module.exports = router;
