/* ------------------------------- DEFINE AREA ------------------------------ */
const express=require('express');
const { specialistController } = require('../../../../controllers');
const { singleFileUpload } = require("../../../../helpers/upload");
const { accessToken } = require("../../../../middleware/doctorAuth");

const router=express.Router();

/* -------------------- CREATE SPECIALIST NAME WITH IMAGE ------------------- */
router.post('/create-specialist',
singleFileUpload("/specialistImg", "image"),
specialistController.createspecialist);

/* ---------------------- UPDATE SPECIALIST WITH IMAGE ---------------------- */
router.put(
    "/update-specialist-profile",
    singleFileUpload("/specialistImg", "image"),
    specialistController.updatespecialistProfile
  );
  /* ------------------------- GET ALL SPECIALISTS DATA ----------------------- */
  router.get("/list-specialist",accessToken(),specialistController.getSpecialList);

module.exports=router;

