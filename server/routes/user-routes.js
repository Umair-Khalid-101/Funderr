const express = require("express");
const {
  register,
  auth,
  currentUser,
  facebookSignup,
  updateProfile,
  mobileRegister,
} = require("../controllers/userController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/mobileregister", mobileRegister);
router.post("/facebook/signup", facebookSignup);
router.post("/auth", auth);
router.get("/currentuser", authmiddleware, currentUser);
router.patch("/updateprofile/:id", updateProfile);

module.exports = router;
