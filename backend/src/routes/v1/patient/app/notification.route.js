const express = require("express");

const router = express.Router();
const {
  refreshToken,
  accessToken,
} = require("../../../../middleware/doctorAuth");
const { notificationController } = require("../../../../controllers");


router.post("/add-notification", notificationController.addNotification);
router.put("/updateNotiStatus/:id", notificationController.updateNotiStatus);
router.put(
  "/updateNotification/:id",
  notificationController.updateNotification
);

router.delete("/deleteNotification/:id", notificationController.deleteNotification);
router.get(
  "/list",
  notificationController.getAllNotification
);


module.exports = router;
