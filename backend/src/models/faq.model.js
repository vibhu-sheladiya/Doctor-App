const mongoose = require("mongoose");
// status:- false then doctorid and true then patientid
const faqSchema = new mongoose.Schema(
  {
    question: { type: String },
    ans: { type: String },
    status: { type: Boolean, default: 0 },
    // patientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "patient",
    // },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Declaring model for plan
const Faq = mongoose.model("faq", faqSchema);
module.exports = Faq;

// STATUS MANGE ::: TRUE-0-doctorId AND FALSE-1-patientId
