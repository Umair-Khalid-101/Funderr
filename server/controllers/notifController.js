const notification = require("../models/notifications");

const pushNotification = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { user, status, message } = req.body;
    const addnotification = new notification({
      user,
      message,
      status,
    });
    await addnotification.save();
  } catch (error) {
    console.log(error);
  }
  res.status(201).json("Pushed Notification");
};

const markAsRead = async (req, res, next) => {
  const id = req.params.id;
  const options = { new: true };
  try {
    const result = await notification.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "read",
        },
      },
      options
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getNotifications = async (req, res, next) => {
  let allNotifications;
  try {
    const user = req.user._id;
    allNotifications = await notification.find({ user: user });
    res.status(200).json(allNotifications);
  } catch (error) {
    console.log(error.message);
  }
};

const approvalNotification = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { user, status, message } = req.body;
    const addnotification = new notification({
      user,
      message,
      status,
    });
    await addnotification.save();
  } catch (error) {
    console.log(error);
  }
  res.status(201).json("Pushed Notification");
};

exports.pushNotification = pushNotification;
exports.markAsRead = markAsRead;
exports.getNotifications = getNotifications;
exports.approvalNotification = approvalNotification;
