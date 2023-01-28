const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  amount: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  campaignId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
