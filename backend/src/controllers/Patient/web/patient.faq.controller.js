const mongoose = require("mongoose");
const FaqPatient = require("../../../models/faq.patient.model");
/* ------------------------------- CREATE FAQ DOCTORID/PATEINTID ------------------------------- */
const createFaq = async (req, res) => {
    try {
      const reqBody = req.body;
  
      // Ensure only one of doctorId or patientId is provided
      if  (!reqBody.patientId) {
        throw new Error("Either doctorId or patientId must be provided, but not both or neither");
      }
  
    //   // Determine the ID type and set status accordingly
    //   let status;
    //   if (reqBody.doctorId) {
    //     status = 0; // Assuming doctorId is present
    //   } else if (reqBody.patientId) {
    //     status = 1; // Assuming patientId is present
    //   }
  
    //   // Add the status to the request body
    //   reqBody.status = status;
  
      const faq = await FaqPatient.create(reqBody);
      if (!faq) {
        throw new Error("Failed to create faq");
      }
      res.status(200).json({
        status:200,
        message: "Created a new faq successfully",
        success: true,
        data: faq,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
// const createFaq = async (req, res) => {
//   try {
//     const reqBody = req.body;

//     // Ensure only one of doctorId or patientId is provided
//     if ((reqBody.doctorId && reqBody.patientId) || (!reqBody.doctorId && !reqBody.patientId)) {
//       throw new Error("Either doctorId or patientId must be provided, but not both or neither");
//     }

//     // Determine the ID type and set status accordingly
//     let status;
//     if (reqBody.doctorId) {
//       status = 0; // Assuming doctorId is present
//     } else if (reqBody.patientId) {
//       status = 1; // Assuming patientId is present
//     }

//     // Add the status to the request body
//     reqBody.status = status;

//     const faq = await FaqPatient.create(reqBody);
//     if (!faq) {
//       throw new Error("Failed to create faq");
//     }
//     res.status(200).json({
//       status:200,
//       message: "Successfully created a new faq",
//       success: true,
//       data: faq,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
/* ------------------------------- LIST OF FAQ ------------------------------ */
const getFaqList = async (req, res) => {
  try {
    const faq = await FaqPatient.find().populate("patientId")
    if (!faq) {
      throw new Error("Faq list data not found ...! ");
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
/* -----------------------------EXTRA CREATE FAQ BOTH ---------------------------- */
// const createFaq = async (req, res) => {
//   try {
//     const reqBody = req.body;

//     // STATUS MANGE ::: TRUE-0-doctorId AND FALSE-1-patientId

//     // Determine the ID type and set status accordingly
//     let status;
//     if (reqBody.doctorId) {
//       status = 0; // Assuming doctorId is present
//     } else if (reqBody.patientId) {
//       status = 1; // Assuming patientId is present
//     } else {
//       throw new Error("Either doctorId or patientId must be provided");
//     }

//     // Add the status to the request body
//     reqBody.status = status;

//     const faq = await Faq.create(reqBody);
//     if (!faq) {
//       throw new Error("Failed to create faq");
//     }
//     res.status(200).json({
//       message: "Successfully created a new faq",
//       success: true,
//       data: faq,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };


module.exports = { createFaq, getFaqList };
