const path = require("path");
const fs = require("fs");
const { patientService } = require("../../../services");
const { Patient, Country } = require("../../../models");
const userHelper = require("../../../helpers/userHelper");
const deleteFiles = require("../../../helpers/deletefile");

/* ----------------------------- update user profile ----------------------------- */
const updatepatientProfile = async (req, res) => {
  try {
    const reqbody = req.body;
    // If there's a file uploaded, remove any existing image first
    if (req.file) {
      const user = await Patient.findById(reqbody.patientId);
      if (user && user.image) {
        // Delete the existing image
        const imagePath = path.join(
          __dirname,
          "/../../../public/patientImag",
          user.image
        );
       
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          res.status(200).json({
            status: 200,
            success: true,
            message: "Existing image deleted successfully.",
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: `Existing image not found at path: ${imagePath}`,
          });
        }
      }
      reqbody.image = req.file.filename;
    }

    const patient = await Patient.findById(reqbody.patientId);

    if (!patient) {
      throw new Error(`PatientId ${reqbody.patientId} not found`);
    }
    // Concatenate first name and last name
    const fullName = reqbody.first_name + " " + reqbody.last_name;
    reqbody.name = fullName;

    const age = userHelper.calculateAge(reqbody.birthDate);
    reqbody.age = age;
    // Update user data in the database
    const isUpdate = await Patient.findByIdAndUpdate(
      reqbody.patientId,
      {
        $set: reqbody,
      },
      { new: true }
    );
    res.status(201).json({
      status: 201,
      success: true,
      updateData: isUpdate,
      patientId: isUpdate._id,

      message: "Update successfully",
    });
  } catch (err) {
    res.status(400).json({ status: 400, success: false, error: err.message });
  }
};
/* -------------------------- DLETE PATIENT PROFILE ------------------------- */
const deletePatient = async (req, res) => {
  try {
    const userData = await Patient.findById(req.params.patientId);

    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Patient Data not found" });
    }
    const DeletedData = await Patient.findByIdAndDelete(
      req.params.patientId,
      req.body,
      {
        new: true,
      }
    );

    deleteFiles("patientImag/" + userData.image);

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of Patient Data successfully ",
      user: DeletedData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

const allCountryList = async (req, res) => {
  try {
    const country = await Country.find();

    if (!country) {
      return res.status(404).json({ message: "country list ata not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Country data get successfully ",
      country: country,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  updatepatientProfile,
  allCountryList,
  deletePatient,
};
