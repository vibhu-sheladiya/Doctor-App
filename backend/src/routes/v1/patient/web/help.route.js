const express = require("express");
const { helpDoctorController } = require("../../../../controllers");
const router = express.Router();

router.post("/create-help", helpDoctorController.createHelp);

module.exports = router;
