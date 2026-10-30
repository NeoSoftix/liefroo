const express = require("express");
const {
  RECIPIENT_EMAIL,
  sendBrevoEmail,
  buildUserConfirmationHtml,
  getSender,
  emailPattern,
} = require("../utils/mail");
const { saveRecord, markMailSent } = require("../utils/records");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required.",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  const sender = getSender();
  const record = await saveRecord(ContactMessage, { name, email, phone, subject, message });

  try {
    await sendBrevoEmail({
      sender,
      to: [{ email: RECIPIENT_EMAIL }],
      replyTo: { email, name },
      subject: `New Contact Form Submission${subject ? `: ${subject}` : ""}`,
      textContent: `Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Subject: ${subject || "-"}
Message:
${message}`,
    });
    if (record) markMailSent(record);

    try {
      await sendBrevoEmail({
        sender,
        to: [{ email, name }],
        subject: "We've received your message – Liefro",
        htmlContent: buildUserConfirmationHtml(name),
      });
    } catch (confirmationError) {
      console.error("User confirmation email failed:", confirmationError);
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
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
