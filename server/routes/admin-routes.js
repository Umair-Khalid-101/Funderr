const express = require("express");
const {
  acceptCampaign,
  getUsers,
  deleteUser,
  deleteCampaign,
  addFeatured,
  getFeatured,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/acceptcampaign/:id", acceptCampaign);
router.get("/allusers", getUsers);
router.delete("/deleteuser/:id", deleteUser);
router.delete("/deleteCampaign/:id", deleteCampaign);
router.post("/addfeatured", addFeatured);
router.get("/featured", getFeatured);
module.exports = router;
