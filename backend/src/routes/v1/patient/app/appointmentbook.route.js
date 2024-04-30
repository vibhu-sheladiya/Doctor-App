/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { accessToken } = require("../../../../middleware/patientAuth");
const { appointmentController } = require("../../../../controllers");

/* --------------------------- CREATE APPOINTMENT --------------------------- */
router.post(
  "/add-appointment",
  // accessToken(),
  appointmentController.createAppointment
);

/* ------------------------EXTRA GET ALL APPOINTMENT LIST ------------------------ */
router.get("/list", accessToken(), appointmentController.getAppointments);

/* ---------------- LIST UPCOMMINT OF APPOINTMENT FOR PATIENT --------------- */
router.get(
  "/list-upcomming",
  accessToken(),
  appointmentController.getAppointmentstatus
);
/* ---------------- LIST COMPLETE OF APPOINTMENT FOR PATIENT --------------- */
router.get(
  "/list-completed",
  accessToken(),
  appointmentController.getAppointmentstatusComplete
);

/* ---------------- LIST RUNNING OF APPOINTMENT FOR PATIENT AND DOCTOR(EXTRA) --------------- */
router.get(
  "/list-video-sms-voice",
  accessToken(),
  appointmentController.getAppointmentstatusVideoChatSms
);

/* ------------------ LIST DOCTOR ID ONLY APPOINTMENT EXTRA ----------------- */
router.get(
  "/list-doctor-id",
  accessToken(),
  appointmentController.getAppointmentById
);

/* --------------------- UPDATE REVIEW RATING BY PATIENT -------------------- */
router.put(
  "/update-review-rating",
  // accessToken(),
  appointmentController.updateAppointment
);
/* --------------------- UPDATE RESCHEDULE BY PATIENT -------------------- */
router.put(
  "/update-reschedule-appointment",
  // accessToken(),
  appointmentController.updateRescheduleAppointment
);

module.exports = router;
