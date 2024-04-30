const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema(
  {
    pateintId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
   
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
const Help = mongoose.model("help", helpSchema);
module.exports = Help;

