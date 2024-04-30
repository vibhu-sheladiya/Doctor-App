const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,

    },
    description: {
      type: String,
    
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", NotificationSchema);
module.exports = Notification;

