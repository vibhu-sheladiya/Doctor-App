/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { accessToken } = require("../../../../middleware/doctorAuth");
const { doctorController, authController } = require("../../../../controllers");
const { singleFileUpload } = require("../../../../helpers/upload");

/* ------------------------------- DOCTOR AUTH ------------------------------ */

/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.post("/create-doctor", authController.register);

/* -------------------------- LOGIN DOCTOR ----------- */
router.post("/login", accessToken(), authController.login);

/* -------------------------- FORGOT PASSWORD DOCTOR ----------- */
router.post("/forgot-pass", authController.forgotPass);

/* -------------------------- VERIFY OTP DOCTOR ----------- */
router.post("/verify-otp", authController.verifyOtp);

/* -------------------------- RESET PASSWORD DOCTOR ----------- */
router.put("/reset-password", authController.resetPassword);

/* -------------------------- CHANGE PASSWORD DOCTOR ----------- */
router.post("/change-password", accessToken(), authController.changePassword);

/* -------------------------- UPDATE DOCTOR PROFILE DOCTOR ----------- */
router.put(
  "/update-doctor-profile",
  accessToken(),
  singleFileUpload("/doctorImg", "image"),
  doctorController.updateDocProfile
);

/* -------------------------- DELTE DOCTOR PROFILE DOCTOR ----------- */
router.delete(
  "/delete-doc/:doctorId",
  accessToken(),
  doctorController.deleteDoctor
);

router.post("/social-login", 
// accessToken(),
 authController.socialLogin);

router.get("/country-list", accessToken(), doctorController.allCountryList);

module.exports = router;
