const express = require("express");

const router = express.Router();
const {
  refreshToken,
  accessToken,
} = require("../../../../middleware/doctorAuth");
const { countryController } = require("../../../../controllers");
const { singleFileUpload } = require("../../../../helpers/upload");

router.post(
  "/add-country",
  singleFileUpload("/country-images/", "countryflag"),
  countryController.createCountry
);

module.exports = router;
