const express = require("express");
const {
  addPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
  postById,
  pendingPosts,
  addfavPost,
  deleteFavPost,
  getUserFavPosts,
  verifiedPosts,
  getFeatured,
  postByCategory,
  featuredPostsById,
  deleteFromFeatured,
  mobileCreateCampaign,
  mobileEditCampaign,
} = require("../controllers/postsController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/newpost", addPost);
router.get("/allposts", getPosts);
router.get("/userposts", authmiddleware, getUserPosts);
router.delete("/deletepost/:id", deletePost);
router.patch("/editpost/:id", updatePost);
router.get("/post/:id", postById);
router.get("/featuredpost/:id", featuredPostsById);
router.get("/categoryPost/:id", postByCategory);
router.get("/pendingposts", pendingPosts);
router.get("/featuredposts", getFeatured);
router.get("/verifiedposts", verifiedPosts);
router.post("/addfavorite", addfavPost);
router.delete("/deletefromfav/:id", deleteFavPost);
router.get("/userfavposts", authmiddleware, getUserFavPosts);
router.delete("/deletefeatured/:id", deleteFromFeatured);
router.post("/createcampaign", mobileCreateCampaign);
router.put("/editcampaign/:id", mobileEditCampaign);

module.exports = router;
