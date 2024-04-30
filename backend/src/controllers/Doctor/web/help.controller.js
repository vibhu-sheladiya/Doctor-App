
const Help = require("../../../models/help.model");
const ejs = require("ejs");
const path = require("path");
const {
  emailService,
} = require("../../../services");
const { Patient } = require("../../../models");

/* ------------------------------- CREATE HELP WITH SEND EMAIL PATEINT  SIDE MANGE ------------------------------ */
const createHelp = async (req, res) => {
  try {
    // Retrieve patient details using patientId
    const user = await Patient.findById(req.body.pateintId);
    if (!user) {
      throw new Error("Patient not found.");
    }

    // Create a new help record
    const newHelp = await new Help({
      pateintId: req.body.pateintId,
      question: req.body.question,
    }).save();

    // Render email template
    ejs.renderFile(
      path.join(__dirname, "../../../views/help.ejs"),
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
