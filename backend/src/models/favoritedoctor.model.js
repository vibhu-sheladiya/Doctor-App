const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {

   patientid: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "patient",
   },
   doctorid: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "doctor",
   },
   status:{type:Boolean, befault:true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Declaring model for plan
const FavoriteDoctor = mongoose.model("favoriteDoctor",favoriteSchema );
module.exports = FavoriteDoctor;
