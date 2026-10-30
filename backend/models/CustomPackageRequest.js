const mongoose = require("mongoose");

// One submission of the custom package form on the pricing page.
const customPackageRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    services: { type: [String], required: true },
    budget: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    mailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomPackageRequest", customPackageRequestSchema);
