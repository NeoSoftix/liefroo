const express = require("express");

const router = express.Router();

// Plans shown on the pricing page come from Stripe products. A product is
// listed when it is active and has the metadata `show_on_pricing` = `true`.
// Its active recurring prices give the monthly and yearly price (a product
// can have one or both; with several per interval the default price, else
// the newest, wins). The rest of the card comes from metadata:
//
//   name_de / name_en          plan name           (falls back to product name)
//   tagline_de / tagline_en    short line under the name
//   features_de / features_en  features separated by "|"
//                              (falls back to the product's marketing features)
//   devices                    number of POS devices included
//   popular                    "true" for the highlighted plan
//   order                      sort position, lowest first
//
// Responses are cached briefly so the page doesn't call Stripe on every visit.
const CACHE_MS = 5 * 60 * 1000;
let cache = { at: 0, plans: null };

async function stripeGet(path) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Stripe API error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

const splitFeatures = (value) =>
  String(value || "")
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean);

const toPrice = (price) =>
  price ? { id: price.id, amount: price.unit_amount / 100, currency: price.currency.toUpperCase() } : null;

function toPlan(product, productPrices) {
  const meta = product.metadata || {};
  const pick = (interval) => {
    const options = productPrices
      .filter((p) => p.recurring?.interval === interval && p.recurring.interval_count === 1 && p.unit_amount != null)
      .sort((a, b) => b.created - a.created);
    return options.find((p) => p.id === product.default_price) || options[0];
  };
  const fallbackFeatures = (product.marketing_features || []).map((f) => f.name).filter(Boolean);
  const features = (lang) => {
    const list = splitFeatures(meta[`features_${lang}`]);
    return list.length ? list : fallbackFeatures;
  };

  return {
    id: product.id,
    name: { de: meta.name_de || product.name, en: meta.name_en || meta.name_de || product.name },
    tagline: { de: meta.tagline_de || "", en: meta.tagline_en || meta.tagline_de || "" },
    features: { de: features("de"), en: features("en").length ? features("en") : features("de") },
    devices: Number(meta.devices) || null,
    popular: meta.popular === "true",
    order: Number(meta.order) || 0,
    prices: { month: toPrice(pick("month")), year: toPrice(pick("year")) },
  };
}

async function loadPlans() {
  const [{ data: products }, { data: prices }] = await Promise.all([
    stripeGet("products?active=true&limit=100"),
    stripeGet("prices?active=true&type=recurring&limit=100"),
  ]);

  const amount = (plan) => (plan.prices.month || plan.prices.year).amount;
  return products
    .filter((p) => p.metadata?.show_on_pricing === "true")
    .map((p) => toPlan(p, prices.filter((price) => price.product === p.id)))
    .filter((plan) => plan.prices.month || plan.prices.year)
    .sort((a, b) => a.order - b.order || amount(a) - amount(b));
}

// Cached plan list; falls back to the last good list if Stripe is briefly unavailable.
async function getPlans() {
  if (cache.plans && Date.now() - cache.at <= CACHE_MS) return cache.plans;
  try {
    cache = { at: Date.now(), plans: await loadPlans() };
  } catch (error) {
    if (!cache.plans) throw error;
    console.error("Plans refresh failed, serving cached list:", error);
  }
  return cache.plans;
}

router.get("/", async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ success: false, message: "Plans are not configured." });
  }

  try {
    return res.json({ success: true, plans: await getPlans() });
  } catch (error) {
    console.error("Plans error:", error);
    return res.status(502).json({ success: false, message: "Could not load plans." });
  }
});

module.exports = { router, getPlans, stripeGet };
