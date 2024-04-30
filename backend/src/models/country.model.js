// src/models/User.js
const mongoose = require("mongoose");
const config = require("../config/config");

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countryflag: { type: String },  
    countrycode:{type:String},
    status:{type: Boolean,default: true},

  },
  {
    timestamps: true,
    versionKey: false,
    // toJSON: {
    //   transform: function (doc, data) {
    //     if (data?.logo) {
    //       data.logo = `${config.base_url}profile_images/${data.logo}`;
    //     }
    //   },
    // },
  }
);

const Country = mongoose.model("country", countrySchema);

module.exports = Country;