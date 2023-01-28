const mongoose = require("mongoose");

const featuredSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: String,
  },
  posterName: {
    type: String,
    required: true,
  },
  campaignGoal: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  posterPic: {
    type: String,
  },
  category: {
    type: String,
  },
  campaignId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Featured", featuredSchema);
