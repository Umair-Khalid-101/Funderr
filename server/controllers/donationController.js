const dotenv = require("dotenv");
dotenv.config();
const donation = require("../models/donations");

const addDonation = async (req, res, next) => {
  try {
    const { to, from, amount, campaignId } = req.body;
    const newDonation = new donation({
      to,
      from,
      amount,
      campaignId,
    });
    await newDonation.save().then(() => {
      res.status(201).json(newDonation);
    });
  } catch (error) {
    console.log(error);
  }
};

const getCampaignDonations = async (req, res, next) => {
  const Id = req.params.id;
  let campaignDonations;
  // console.log(Id);
  try {
    campaignDonations = await donation.find({ campaignId: Id });
  } catch (error) {
    console.log(error);
  }
  if (!campaignDonations) {
    return res.status(400).json("No Donations found!");
  }
  return res.status(200).json(campaignDonations);
};

exports.addDonation = addDonation;
exports.getCampaignDonations = getCampaignDonations;
