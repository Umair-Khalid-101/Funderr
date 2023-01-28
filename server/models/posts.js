const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    required: true,
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
});

module.exports = mongoose.model("Post", postSchema);
