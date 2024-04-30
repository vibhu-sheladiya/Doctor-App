const express=require('express');
const {  faqPatientController} = require('../../../../controllers');

const {    accessToken} = require("../../../../middleware/patientAuth");


const router=express.Router();

// NOTE:- status:- false then doctorid and true then patientid



router.post("/create-faq-patient", faqPatientController.createFaq);
router.get('/list-faq-patient',
accessToken(),
faqPatientController.getFaqList);

module.exports=router;

