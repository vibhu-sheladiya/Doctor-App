/* ------------------------------- DEFINE AREA ------------------------------ */
const express=require('express');
const {  helpController } = require('../../../../controllers');
const router=express.Router();

/* --------- CREATE AND SEND MAIL OF BOTH SIDE MANGE DOCTOR,PATEINT --------- */
router.post('/create-help',
helpController.createHelp);

module.exports=router;

