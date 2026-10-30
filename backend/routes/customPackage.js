const express = require("express");
const {
  RECIPIENT_EMAIL,
  escapeHtml,
  sendBrevoEmail,
  buildUserConfirmationHtml,
  getSender,
  emailPattern,
} = require("../utils/mail");
const { saveRecord, markMailSent } = require("../utils/records");
const CustomPackageRequest = require("../models/CustomPackageRequest");

const router = express.Router();

function buildRequestHtml({ name, email, phone, services, budget, message }) {
  const row = (label, value) => `
        <tr>
          <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px; vertical-align: top;">${label}</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${value}</td>
        </tr>`;
  const serviceList = services.map((s) => `&bull; ${escapeHtml(s)}`).join("<br />");

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #fafafa; padding: 32px 16px;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0;">
      <div style="background-color: #dc2626; padding: 24px 32px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px;">New custom package request</h1>
      </div>
      <div style="padding: 24px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${row("Name", escapeHtml(name))}
          ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color: #dc2626;">${escapeHtml(email)}</a>`)}
          ${row("Phone", escapeHtml(phone))}
          ${row("Services", serviceList)}
          ${row("Budget", escapeHtml(budget))}
        </table>
        <div style="height: 1px; background-color: #f0f0f0; margin: 16px 0;"></div>
        <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Message</p>
        <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message || "-")}</p>
      </div>
    </div>
  </div>`;
}

router.post("/", async (req, res) => {
  const { name, email, phone, services, budget, message } = req.body || {};

  if (!name || !email || !phone || !budget || !Array.isArray(services) || services.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, at least one service and a budget are required.",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  const sender = getSender();
  const serviceNames = services.map(String);
  const record = await saveRecord(CustomPackageRequest, { name, email, phone, services: serviceNames, budget, message });

  try {
    await sendBrevoEmail({
      sender,
      to: [{ email: RECIPIENT_EMAIL }],
      replyTo: { email, name },
      subject: `Custom package request: ${name}`,
      htmlContent: buildRequestHtml({ name, email, phone, services: serviceNames, budget, message }),
      textContent: `Name: ${name}
Email: ${email}
Phone: ${phone}
Services: ${serviceNames.join(", ")}
Budget: ${budget}
Message:
${message || "-"}`,
    });
    if (record) markMailSent(record);

    try {
      await sendBrevoEmail({
        sender,
        to: [{ email, name }],
        subject: "We've received your request – Liefro",
        htmlContent: buildUserConfirmationHtml(name),
      });
    } catch (confirmationError) {
      console.error("User confirmation email failed:", confirmationError);
    }

    return res.status(200).json({
      success: true,
      message: "Request sent successfully.",
    });
  } catch (error) {
    console.error("Custom package form error:", error);
    // Saved in the database, so the team can still follow up
    if (record) {
      return res.status(200).json({ success: true, message: "Request received." });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
