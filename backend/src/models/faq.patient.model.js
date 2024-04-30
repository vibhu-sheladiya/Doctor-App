const mongoose = require("mongoose");
// status:- false then doctorid and true then patientid
const faqPatientSchema = new mongoose.Schema(
  {
    question: { type: String },
    ans: { type: String },
    status: { type: Boolean, default: 0 },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
    },
    // doctorId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "doctor",
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Declaring model for plan
const FaqPatient = mongoose.model("faq-patient", faqPatientSchema);
module.exports = FaqPatient;

// STATUS MANGE ::: TRUE-0-doctorId AND FALSE-1-patientId
