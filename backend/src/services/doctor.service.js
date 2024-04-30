// const Category = require("../models/category.model");
const { Help, Patient } = require("../models");
const Doctor = require("../models/doctor.model");

/**
 * Create user
 * @param {object} reqBody
 * @returns {Promise<User>}
 */
const createDoctor = async (reqBody) => {
  return Doctor.create(reqBody);
};

const findDoctorByEmail = async (email) => {
  return Doctor.findOne({ email });
};



const findHeplByEmailPatient = async (email) => {
  return Patient.findOne({ email });
};
const findDoctorByPhone = async (phoneNumber) => {
  return Doctor.findOne({ phoneNumber });
};

const updatePassword = async (doctorId, newPassword) => {
  return Doctor.findByIdAndUpdate(doctorId, { password: newPassword });
};

const getDoctorById = async (doctorId) => {
  return Doctor.findById(doctorId);
};

const updateDetails = async (doctorId, updateBody) => {
  return Doctor.findByIdAndUpdate(doctorId, { $set: updateBody });
};

module.exports = {
  createDoctor,

  findDoctorByEmail,
  findDoctorByPhone,
  updatePassword,
  getDoctorById,
  updateDetails,
  findHeplByEmailPatient,
};
