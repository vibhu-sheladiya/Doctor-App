/* ------------------------------- DEFINE AREA ------------------------------ */
const path = require("path");
const fs = require("fs");
const { Doctor, Country } = require("../../../models");
const deleteFiles =require("../../../helpers/deletefile");

/* ------------------ NOTE : ALL DETAILS ABOUT DOCTOR  ------------------ */
/* ----------------------------- update Doctor profile ----------------------------- */
const updateDocProfile = async (req, res) => {
  try {
    const reqbody = req.body;

    // If there's a file uploaded, remove any existing image first
    if (req.file) {
      const user = await Doctor.findById(reqbody.doctorId);
      if(!user){
        return res.status(401).json({status:401,success:false, message: "Doctor not found!"})
      }
      if (user && user.image) {
        const imagePath = path.join(__dirname, "/../../../public/doctorImg", user.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        } 
      }
      reqbody.image = req.file.filename;
    }

    const user = await Doctor.findById(reqbody.doctorId);

    if (!user) {
      throw new Error(` doctorId ${reqbody.doctorId} not found`);
    }
    // Concatenate first name and last name
    const fullName = reqbody.first_name + " " + reqbody.last_name;
    reqbody.name = fullName;

    // Update user data in the database
    const isUpdate = await Doctor.findByIdAndUpdate(
      reqbody.doctorId,
      {
        $set: reqbody,
      },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      success: true,
      updateData: isUpdate,
      message: "Update profile successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
/* -------------------------- DELETE DOCTOR PROFILE WITH IMAGE------------------------- */
const deleteDoctor = async (req, res) => {
  try {
    const userData = await Doctor.findById(req.params.doctorId);

    if (!userData) {
      return res.status(404).json({status:404,success:false, message: "Doctor Data not found" });
    }
    const DeletedData = await Doctor.findByIdAndDelete(req.params.doctorId, req.body, {
      new: true,
    });

    deleteFiles("doctorImg/" + userData.image);

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of Doctor Data successfully ",
      user: DeletedData,
    });

  } catch (error) {
    res.status(400).json({
      status: 400,
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
  updateDocProfile,deleteDoctor,allCountryList
};
