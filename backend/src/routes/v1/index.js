/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");

/* --------------------------- PATIENT ROUTE PATH --------------------------- */
const countryRoute = require("./patient/web/country.route");
const patientRoute = require("./patient/app/auth.route");
const favoriteRoute = require("./patient/app/favoritedoctor.route");
const appointmentRoute = require("./patient/app/appointmentbook.route");
const helpDoctorRoute = require("./patient/web/help.route");
const notificationRoute = require("./patient/app/notification.route");

/* ---------------------------- DOCTOR ROUTE PATH --------------------------- */

const authRoute = require("./doctor/app/auth.route");
const specialistRoute = require("./doctor/web/specialist.route");
const faqRoute = require("./doctor/app/faq.route");
const faqPatientRoute = require("./patient/web/faq.route");

const helpRoute = require("./doctor/web/help.route");
const homeScreenDoctorRoute = require("./doctor/app/homescreen.route");



const router = express.Router();

/* -------------------------- ROUTE DEFINE -------------------------- */
router.use("/country", countryRoute);
router.use("/patient", patientRoute);
router.use("/favoriteDoctor", favoriteRoute);
router.use("/appointment", appointmentRoute);
router.use("/help-doctor", helpDoctorRoute);
router.use("/notification", notificationRoute);

router.use("/doctor", authRoute);
router.use("/specialist", specialistRoute);
router.use("/faq", faqRoute);
router.use("/faq-patient", faqPatientRoute);

router.use("/help", helpRoute);
router.use("/homescreen", homeScreenDoctorRoute);


module.exports = router;
