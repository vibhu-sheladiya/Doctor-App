const express = require("express");
const Notification = require("../../../models/notification");
// const User = require("../../models/User");

const mongoose = require("mongoose");
// const admin = require("firebase-admin");
// const serviceAccount = require("../../config/firbase-adimin-config.json"); // Replace with your service account key

//Add Notification
const addNotification = async (req, res, next) => {
  try {
    const newNoti = await new Notification(req.body);
    const result = await newNoti.save();

    res.status(200).json({
      status:200,
      message: "Successfully create notification",
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//Update Notification
const updateNotification = async (req, res, next) => {
  try {
    const noti = await Notification.findById(req.params.id);
    if (!noti) return res.status(404).json({ message: "No such notification" });

    const isUpdate = await Notification.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!isUpdate)
      return res.status(404).json({ status:404,success: false,message: "No such notification" });

    const result = await Notification.findById(req.params.id);
    return res
      .status(200)
      .json({
        status: 200,
        message: "Successfully update notification",
        success: true,
        data: result,
      });
  } catch (err) {
    next(err);
  }
};

// //Update Notification Status
const updateNotiStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const noti = await Notification.findById(id);
    if (!noti) return res.status(404).json({status:404,success: false, message: "No such notification" });

    noti.status = !noti.status;
    const result = await noti.save();
    return res
      .status(200)
      .json({
        status: 200,
        message: "Successfully update status notification",
        success: true,
        data: result,
      });
  } catch (err) {
    next(err);
  }
};

// //Delete Single Notification
const deleteNotification = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const noti = await Notification.findById(id);
    if (!noti)
      return res
        .status(200)
        .json({ status:200,message: "Successfully create notification", success: true });
    await Notification.deleteOne({ _id: id });
    return res
      .status(200)
      .json({status:200, message: "Successfully delete notification", success: true });
  } catch (err) {
    next(err);
  }
};

  // Get all appointments
  const getAllNotification = async (req, res) => {
    try {
      const noti = await Notification.find()
      res.status(200).json({status:200, success: true, data: noti });
    } catch (error) {
      res.status(500).json({status:500, success: false, error: error.message });
    }
  };
  

module.exports = {
  addNotification,
  updateNotification,
  deleteNotification,
  getAllNotification,
  // sendNotification,
  updateNotiStatus,
};
