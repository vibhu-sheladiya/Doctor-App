// const Category = require("../models/category.model");
const Patient = require("../models/patient.model");

/**
 * Create user
 * @param {object} reqBody
 * @returns {Promise<User>}
 */
const createPatient = async (reqBody) => {
  return Patient.create(reqBody);
};

const findPatientByEmail = async (email) => {
    return  Patient.findOne({ email });
};

const findPatientByPhone = async (phoneNumber) => {
    return  Patient.findOne({ phoneNumber });
  };

  const updatePassword = async (patientId, newPassword) => {
    return Patient.findByIdAndUpdate(patientId, { password: newPassword });
  };

  const getPatientById = async (patientId) => {
    return Patient.findById(patientId);
  };
  
  const updateDetails = async (patientId, updateBody) => {
    return Patient.findByIdAndUpdate(patientId, { $set: updateBody });
  };
  
module.exports = {
    createPatient,
    findPatientByEmail,findPatientByPhone,updatePassword,getPatientById,updateDetails
};
