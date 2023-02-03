const dotenv = require("dotenv");
dotenv.config();
const posts = require("../models/posts");
const favPost = require("../models/favorites");
const featured = require("../models/featured");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPost = async (req, res, next) => {
  const {
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
  } = req.body;
  const post = new posts({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
  });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: post });
};

const getPosts = async (req, res, next) => {
  let allposts;
  try {
    allposts = await posts.find();
  } catch (error) {
    return new Error(error);
  }
  if (!allposts) {
    return res.status(400).json({ message: "No Posts found!" });
  }
  return res.status(200).json(allposts);
};

const getUserPosts = async (req, res, next) => {
  let userposts;
  try {
    // const postedBy = req.params.id;
    const postedBy = req.user._id;
    userposts = await posts.find({ postedBy: postedBy });
  } catch (error) {
    return new Error(error);
  }
  if (!userposts) {
    return res.status(400).json({ message: "No User Posts found!" });
  }
  return res.status(200).json({ userposts });
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    } = req.body;
    const updates = {
      title,
      description,
      enddate,
      startdate,
      campaignGoal,
      posterName,
      postedBy,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    };
    const options = { new: true };
    const result = await posts.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    posts
      .deleteOne({ _id: postId })
      .then(() => posts.find().then((items) => res.json(items)))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (error) {
    return new Error(error);
  }
};

const postById = async (req, res, next) => {
  try {
    newpost = await posts.findById(req.params.id);
  } catch (error) {
    return new Error(error);
  }
  if (!newpost) {
    return res.status(400).json({ message: "No Post found!" });
  }
  return res.status(200).json({ newpost });
};

const featuredPostsById = async (req, res, next) => {
  try {
    newpost = await featured.findById(req.params.id);
  } catch (error) {
    return new Error(error);
  }
  if (!newpost) {
    return res.status(400).json({ message: "No Post found!" });
  }
  return res.status(200).json({ newpost });
};

const pendingPosts = async (req, res, next) => {
  try {
    pending = await posts.find({ permission: "pending" });
  } catch (error) {
    console.log(error);
  }
  if (!pending) {
    return res.status(400).json({ message: "No Pending Posts" });
  }
  return res.status(200).json(pending);
};

const verifiedPosts = async (req, res, next) => {
  try {
    verified = await posts.find({ permission: "accepted" });
  } catch (error) {
    console.log(error);
  }
  if (!verified) {
    return res.status(400).json({ message: "No verified Posts" });
  }
  return res.status(200).json({ verified });
};

const addfavPost = async (req, res, next) => {
  const {
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
    favoritedBy,
    _id,
  } = req.body;
  const userFavPost = new favPost({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
    favoritedBy,
    campaignId: _id,
  });
  try {
    await userFavPost.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json("FavAdded");
};

const deleteFavPost = async (req, res, next) => {
  const postId = req.params.id;
  // console.log(postId);
  try {
    await favPost.deleteOne({ postId }).then(() => {
      res.status(200).json({ message: `FavRemoved` });
    });
  } catch (error) {
    return new Error(error);
  }
};

const getUserFavPosts = async (req, res, next) => {
  let userFavPosts;
  try {
    const favoritedBy = req.user._id;
    userFavPosts = await favPost.find({ favoritedBy: favoritedBy });
  } catch (error) {
    console.log(error);
  }
  if (!userFavPosts) {
    return res.status(400).json({ message: "No UserFav Posts found!" });
  }
  return res.status(200).json({ userFavPosts });
};

const getFeatured = async (req, res, next) => {
  try {
    const featuredPosts = await featured.find();
    res.status(201).json(featuredPosts);
  } catch (error) {
    console.log(error);
  }
};

const postByCategory = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    categoryPost = await posts.find({ category: req.params.id });
  } catch (error) {
    return new Error(error);
  }
  if (!categoryPost) {
    return res.status(400).json({ message: "No Post found!" });
  }
  return res.status(200).json(categoryPost);
};

const deleteFromFeatured = async (req, res, next) => {
  const Id = req.params.id;
  try {
    await featured.deleteOne({ Id }).then(() => {
      res.status(200).json({ message: `Removed from Featured` });
    });
  } catch (error) {
    console.log(error);
  }
};

const mobileCreateCampaign = async (req, res, next) => {
  let cloudinaryImage;
  if (req.files) {
    const file = req.files.file;
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      cloudinaryImage = result.url;
      // console.log(cloudinaryImage);
    });

    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
    } = req.body;
    const post = new posts({
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
      picture: cloudinaryImage,
    });

    try {
      await post.save();
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json(post);
  } else {
    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    } = req.body;
    const post = new posts({
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    });
    try {
      await post.save();
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json(post);
  }
};

const mobileEditCampaign = async (req, res, next) => {
  let cloudinaryImage;
  if (req.files) {
    const file = req.files.file;
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      cloudinaryImage = result.url;
      // console.log(cloudinaryImage);
    });

    const id = req.params.id;
    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
    } = req.body;
    const updates = {
      title,
      description,
      enddate,
      startdate,
      campaignGoal,
      posterName,
      postedBy,
      walletAddress,
      permission,
      posterPic,
      category,
      picture: cloudinaryImage,
    };
    const options = { new: true };
    // console.log(updates);

    try {
      const result = await posts.findByIdAndUpdate(id, updates, options);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    const id = req.params.id;
    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    } = req.body;
    const updates = {
      title,
      description,
      enddate,
      startdate,
      campaignGoal,
      posterName,
      postedBy,
      walletAddress,
      permission,
      posterPic,
      category,
      picture,
    };
    const options = { new: true };
    // console.log(updates);
    try {
      const result = await posts.findByIdAndUpdate(id, updates, options);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
};

exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getUserPosts = getUserPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.postById = postById;
exports.pendingPosts = pendingPosts;
exports.addfavPost = addfavPost;
exports.deleteFavPost = deleteFavPost;
exports.getUserFavPosts = getUserFavPosts;
exports.verifiedPosts = verifiedPosts;
exports.getFeatured = getFeatured;
exports.postByCategory = postByCategory;
exports.featuredPostsById = featuredPostsById;
exports.deleteFromFeatured = deleteFromFeatured;
exports.mobileCreateCampaign = mobileCreateCampaign;
exports.mobileEditCampaign = mobileEditCampaign;
