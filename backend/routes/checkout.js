const express = require("express");
const { getPlans, stripeGet } = require("./plans");

const router = express.Router();

const LANGS = ["de", "en"];

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

// Starts a Stripe Checkout subscription for one of the pricing plans, billed
// monthly or yearly, and returns the URL of Stripe's hosted payment page. Only
// plans listed on the pricing page can be bought, always at their current
// Stripe price.
router.post("/", async (req, res) => {
  const { planId, interval, lang } = req.body || {};
  const locale = LANGS.includes(lang) ? lang : "de";

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ success: false, message: "Payments are not configured." });
  }

  try {
    const plan = (await getPlans()).find((p) => p.id === planId);
    const price = ["month", "year"].includes(interval) ? plan?.prices[interval] : null;
    if (!price) {
      return res.status(404).json({ success: false, message: "This package is not available." });
    }

    const site = process.env.CLIENT_URL || "http://localhost:5173";
    const session = await stripePost("checkout/sessions", {
      mode: "subscription",
      "line_items[0][price]": price.id,
      "line_items[0][quantity]": "1",
      success_url: `${site}/${locale}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/${locale}/pricing#plans`,
      locale,
      billing_address_collection: "required",
      allow_promotion_codes: "true",
      "metadata[plan_id]": plan.id,
      "metadata[plan_name]": plan.name.en,
      "metadata[billing]": interval,
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(502).json({ success: false, message: "Could not start the payment. Please try again." });
  }
});

// Details for the success page, read from Stripe so the page only confirms
// payments that actually went through.
router.get("/session/:id", async (req, res) => {
  const { id } = req.params;
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) {
    return res.status(400).json({ success: false, message: "Invalid session." });
  }

  try {
    const session = await stripeGet(`checkout/sessions/${id}?expand[]=subscription`);
    // Recent Stripe API versions keep the billing period on the subscription
    // item; older ones on the subscription itself.
    const item = session.subscription?.items?.data?.[0];
    const periodEnd = item?.current_period_end ?? session.subscription?.current_period_end;
    return res.json({
      success: true,
      paid: session.payment_status === "paid" || session.payment_status === "no_payment_required",
      name: session.customer_details?.name || "",
      email: session.customer_details?.email || "",
      plan: session.metadata?.plan_name || "",
      billing: item?.price?.recurring?.interval || session.metadata?.billing || "",
      nextPaymentAt: periodEnd ? periodEnd * 1000 : null,
      renews: session.subscription ? !session.subscription.cancel_at_period_end : false,
      amount: session.amount_total / 100,
      currency: (session.currency || "eur").toUpperCase(),
    });
  } catch (error) {
    console.error("Checkout session error:", error);
    return res.status(404).json({ success: false, message: "Payment not found." });
  }
});

module.exports = router;
