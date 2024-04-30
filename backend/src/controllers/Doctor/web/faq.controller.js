const mongoose = require("mongoose");
const Faq = require("../../../models/faq.model");
/* ------------------------------- CREATE FAQ DOCTORID/PATEINTID ------------------------------- */
const createFaq = async (req, res) => {
  try {
    const reqBody = req.body;

    // Ensure only one of doctorId or patientId is provided
    if (!reqBody.doctorId) {
      throw new Error("Either doctorId or patientId must be provided, but not both or neither");
    }
    const faq = await Faq.create(reqBody);
    if (!faq) {
      throw new Error("Failed to create faq");
    }
    res.status(200).json({
      status:200,
      message: "Successfully created a new faq",
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ------------------------------- LIST OF FAQ ------------------------------ */
const getFaqList = async (req, res) => {
  try {
    const faq = await Faq.find().populate("patientId").populate("doctorId");
    if (!faq) {
      throw new Error("faq list data not found ...! ");
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Get faq list successfully ...! ",
      data: faq,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};


module.exports = { createFaq, getFaqList };
