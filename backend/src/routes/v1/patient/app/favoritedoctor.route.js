;
const express = require("express");

const router = express.Router();
const {
  refreshToken,
  accessToken,
} = require("../../../../middleware/patientAuth");
const {  favoriteDoctorController } = require("../../../../controllers");

/* --------------------- add favorite doctor by patient --------------------- */
router.post(
    "/add-favorite-doctor",
    accessToken(),
    favoriteDoctorController.createFavoriteDoctor
  );

/* ---------------------------- LIST OF FAVORITE ---------------------------- */
router.get(
  "/list",
  accessToken(),
  favoriteDoctorController.getFavoriteDoctorList
);




module.exports = router;
