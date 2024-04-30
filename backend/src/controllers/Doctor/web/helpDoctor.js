
const ejs = require("ejs");
const path = require("path");
const {
  emailService,
} = require("../../../services");
const {  Doctor, helpDoctor } = require("../../../models");

/* ------------------- CREATE HELP AND SEND MAIL OF DOCTOR ------------------ */
const createHelp = async (req, res) => {
  try {
    // Retrieve Doctor details using DoctorId
    const user = await Doctor.findById(req.body.doctorId);
    if (!user) {
      throw new Error("Doctor not found.");
    }
    // Create a new help record
    const newHelp = await new helpDoctor({
      doctorId: req.body.doctorId,
      question: req.body.question,
    }).save();

    // Render email template
    ejs.renderFile(
      path.join(__dirname, "../../../views/help-doctor.ejs"),
      {
        name: user.name,
        email: user.email, // Pass the email variable
        question: req.body.question,
      },
      async (err, data) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          // Handle error
        } else {
          try {
            // Assuming you have user.email
            const email = user.email;
            // Send email
            await emailService.sendMail(email, data, "Verify Email");
          } catch (error) {
            console.error("Error sending email:", error);
            // Handle error
          }
        }
      }
    );

    res.status(200).json({
      status:200,
      message: "Successfully created a new help",
      success: true,
    });
  } catch (error) {
    res.status(400).json({status:400, success: false, message: error.message });
  }
};

module.exports = { createHelp };
