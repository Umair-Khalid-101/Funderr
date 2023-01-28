const posts = require("../models/posts");
const User = require("../models/userSignUpModel");
const featured = require("../models/featured");

const acceptCampaign = async (req, res, next) => {
  const id = req.params.id;
  const options = { new: true };
  try {
    const result = await posts.findByIdAndUpdate(
      id,
      {
        $set: {
          permission: "accepted",
        },
      },
      options
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allusers = await User.find();
    res.send(allusers);
  } catch (error) {
    console.log("No Users Found");
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    User.deleteOne({ _id: id }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  const id = req.params.id;
  try {
    posts.deleteOne({ _id: id }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

const addFeatured = async (req, res, next) => {
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
    _id,
  } = req.body;
  const featuredPost = new featured({
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
    campaignId: _id,
  });
  try {
    await featuredPost.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json("Featured Post Added");
};

const getFeatured = async (req, res, next) => {
  try {
    const Feautured = await featured.find();
    res.status(200).json(Feautured);
  } catch (error) {
    console.log(error.message);
  }
};

exports.acceptCampaign = acceptCampaign;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.deleteCampaign = deleteCampaign;
exports.addFeatured = addFeatured;
exports.getFeatured = getFeatured;
