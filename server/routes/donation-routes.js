const express = require("express");
const {
  addDonation,
  getCampaignDonations,
} = require("../controllers/donationController");
const router = express.Router();

router.post("/adddonation", addDonation);
router.get("/campaigndonations/:id", getCampaignDonations);

module.exports = router;
