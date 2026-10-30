const RECIPIENT_EMAIL = "neosoftix@gmail.com";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendBrevoEmail(payload) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

function buildUserConfirmationHtml(name) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #fafafa; padding: 32px 16px;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0;">
      <div style="background-color: #dc2626; padding: 24px 32px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 1px;">LIEFRO</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="margin: 0 0 12px; color: #111827; font-size: 20px;">Hi ${escapeHtml(name)},</h2>
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.6;">
          Thank you for reaching out to Liefro. Your details have been submitted successfully.
        </p>
        <p style="margin: 0 0 24px; color: #374151; font-size: 15px; line-height: 1.6;">
          Our team will get back to you shortly.
        </p>
        <div style="height: 1px; background-color: #f0f0f0; margin: 24px 0;"></div>
        <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
          This is an automated confirmation, no reply is needed. If you have any urgent queries, feel free to reply to this email.
        </p>
      </div>
      <div style="background-color: #fafafa; padding: 16px 32px; text-align: center;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Liefro. All rights reserved.</p>
      </div>
    </div>
  </div>`;
}

function getSender() {
  return {
    name: process.env.BREVO_SENDER_NAME || "Liefro",
    email: process.env.BREVO_SENDER_EMAIL,
  };
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  RECIPIENT_EMAIL,
  escapeHtml,
  sendBrevoEmail,
  buildUserConfirmationHtml,
  getSender,
  emailPattern,
};
