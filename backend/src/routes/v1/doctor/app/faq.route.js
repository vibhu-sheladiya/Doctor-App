const express=require('express');
const {  faqController } = require('../../../../controllers');
const {    accessToken} = require("../../../../middleware/doctorAuth");


const router=express.Router();

// NOTE:- status:- false then doctorid and true then patientid

/* ----------------- CREATE FAQ BOTH PATEINT AND DOCTOR SIDE ---------------- */
router.post('/create-faq',
// accessToken(),
faqController.createFaq);

/* -------------------------------- LIST FAQ -------------------------------- */
router.get('/list',
accessToken(),
faqController.getFaqList);


module.exports=router;

