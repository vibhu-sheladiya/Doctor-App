const mongoose = require("mongoose");

const specialistSchema = new mongoose.Schema(
  {
    name: { type: String },
    image:{type:String,},
    status:{type:Boolean,default:true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Declaring model for plan
const Specialist = mongoose.model("specialist", specialistSchema);
module.exports = Specialist;
