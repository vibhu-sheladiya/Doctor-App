const mongoose = require("mongoose");

const helpDoctorSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
    question: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Declaring model for plan
const helpDoctor = mongoose.model("helpDoctor", helpDoctorSchema);
module.exports = helpDoctor;
