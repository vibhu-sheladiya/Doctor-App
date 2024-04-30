/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { accessToken } = require("../../../../middleware/doctorAuth");
const { homeScreenDoctorController } = require("../../../../controllers");

/* ------------------------ SEARCH PATIENT BY DOCTOR ------------------------ */
router.get(
  "/search-pateint",
  accessToken(),
  homeScreenDoctorController.searchPatientlist
);

/* ------------------- LIST PATEINT REVIEW SHOW BY DOCTOR ------------------- */
router.get(
  "/list-patient-review",
  accessToken(),
  homeScreenDoctorController.allPatientAppointmentListReview
);
/* -------------- LIST PATIENT DATE WISE SHOW BY DOCTOR -------------- */
router.get(
  "/list-patient-date-wise",
  accessToken(),
  homeScreenDoctorController.allPatientAppointmentList
);

/* ----------------- LIST OF ALL OVER PATIENT LIST BY DOCTOR ID ---------------- */
router.get(
  "/list-patient",
  accessToken(),
  homeScreenDoctorController.PatientAppointmentList
);

/* ---------------- RESCHEDULE APPOINTMENT PATIENT BY DOCTOR ---------------- */
router.put(
  "/reschedule-appointment-patient-by-doctor",
  accessToken(),
  homeScreenDoctorController.updateAppointmentByDoctor
);

/* -------------- COMPLETE APPOINTMENT STATUS UPDATE BY DOCTOR -------------- */
router.put(
  "/complete-appointment-patient-by-doctor-status",
  accessToken(),
  homeScreenDoctorController.updateAppointmentStatusByDoctor
);

module.exports = router;
