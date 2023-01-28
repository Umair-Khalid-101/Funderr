const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Notification", notifSchema);
