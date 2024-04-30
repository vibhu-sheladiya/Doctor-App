const fs = require("fs");

const mongoose = require("mongoose");
const Country = require("../../../models/country.model");


/** Create code */
const createCountry = async (req, res) => {
  try {
    const reqbody = req.body;

  
    if (req.file && req.file.filename != "undefined") {
      reqbody.countryflag = req.file.filename;
    }


    const country = await Country.create(reqbody);
    if (!country) {
      return res.status(404).json({ message: "country data not found" });
    }

    res.status(200).json({
      status:200,
      success: true,
      message: `country data add successfully!`,
      data: country,
    });
  } catch (err) {
    res.status(400).json({
      status:400,
      success: false,
      message: err.message,
    });
  }
};

/** Get details by id */
// const getDetailsById = async (req, res) => {
//   try {
//     const interest = await countrycodeService.getHobbiesById(req.params.hobbiesId);
//     if (!interest) {
//       throw new Error("Interest not found!");
//     }

//     res.status(200).json({
//       success: true,
//       message: "Interest details get successfully!",
//       data: interest,
//     });
//   } catch (error) {
//     res.status(error?.statusCode || 400).json({
//       success: false,
//       message:
//         error?.message || "Something went wrong, please try again or later!",
//     });
//   }
// };

// /** Update Interest details */
// const updateCountryCode = async (req, res) => {
//   try {
//     const reqBody = req.body;
//     const CountrycodeId = req.params.CountrycodeId;
//     const CountryCodeExists = await countrycodeService.getCountryCodeById(CountrycodeId);
//     if (!CountryCodeExists) {
//       throw new Error("CountryCode not found!");
//     }

//     if (req.file) {
//       reqBody.countryflag = req.file.filename;
//     }

//     const updatedcode = await countrycodeService.updateCountryCode(
//         CountrycodeId,
//       reqBody
//     );
//     if (updatedcode) {
//       if (req.file) {
//         const filePath = `../public/profile_images/${CountryCodeExists.countryflag}`;
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//     } else {
//       throw new Error("Something went wrong, please try again or later!");
//     }

//     res.status(200).json({
//       success: true,
//       message: "CountryCode details update successfully!",
//       data: updatedcode,
//     });
//   } catch (error) {
//     res.status(error?.statusCode || 400).json({
//       success: false,
//       message:
//         error?.message || "Something went wrong, please try again or later!",
//     });
//   }
// };

// /* ---------------------------- INTEREST ALL LIST --------------------------- */
// const countryCodeList = async (req, res) => {
//   try {
//     const getCode = await countrycodeService.getCountryCodeList();
//     const baseUrl =
//       req.protocol +
//       "://" +
//       req.get("host") +
//       process.env.BASE_URL_PROFILE_PATH;
//     res.status(200).json({
//       success: true,
//       message: "country code List!",
//       data: 
//         getCode,
//       baseUrl: baseUrl,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /** Manage Interest status */
// // const manageInterestStatus = async (req, res) => {
// //   try {
// //     const manageStatus = await countrycodeService.manageInterestStatus(
// //       req.params.InterestId
// //     );

// //     let resMessage = manageStatus.is_active
// //       ? "Interest can enable to sale."
// //       : "Interest can not enable to sale";

// //     res.status(200).json({
// //       success: true,
// //       message: resMessage,
// //       data: manageStatus,
// //     });
// //   } catch (error) {
// //     res.status(error?.statusCode || 400).json({
// //       success: false,
// //       message:
// //         error?.message || "Something went wrong, please try again or later!",
// //     });
// //   }
// // };

// // /** Delete Interest */
// // const deleteInterests = async (req, res) => {
// //   try {
// //     const InterestId = req.params.InterestId;
// //     const InterestExists = await countrycodeService.getInterestById(InterestId);
// //     if (!InterestExists) {
// //       throw new Error("Interest not found!");
// //     }

// //     const deletedInterest = await countrycodeService.deleteInterest(InterestId);
// //     if (deletedInterest) {
// //       const filePath = `./public/Interest_images/${InterestExists.Interest_image}`;
// //       if (fs.existsSync(filePath)) {
// //         fs.unlinkSync(filePath);
// //       }
// //     } else {
// //       throw new Error("Something went wrong, please try again or later!");
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Interest delete successfully!",
// //       data: deletedInterest,
// //     });
// //   } catch (error) {
// //     res.status(error?.statusCode || 400).json({
// //       success: false,
// //       message:
// //         error?.message || "Something went wrong, please try again or later!",
// //     });
// //   }
// // };
// const deleteCountryCode = async (req, res) => {
//   try {
//     const CountrycodeId = req.params.CountrycodeId;
//     const Countrycode = await countrycodeService.getCountryCodeById(req.params.CountrycodeId);
//     if (!Countrycode) {
//       throw new Error("Countrycode not found!");
//     }


//     const deleteInterest=await countrycodeService.deleteCountryCode(CountrycodeId);
//     if (deleteInterest) {
//       const filePath = `./public/profile_images/${Countrycode.countryflag}`;
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     } else {
//       throw new Error("Something went wrong, please try again or later!");
//     }
    
//     res.status(200).json({
//       success: true,
//       message: "countryflag delete successfully!",
//       data: Countrycode,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// const multipleDelete = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const result = await CountryCode.deleteMany({ _id: { $in: _id } });
//     if (result.deletedCount === 0) {
//       throw new Error("No users deleted");
//     }
//     return res.status(200).send({
//       success: true,
//       message: "Deleted Successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({
//       success: false,
//       message: `${err}`,
//     });
//   }
// };

//   // Delete a multiple banner  or sub banner  with there Id's
//   const deleteMultiCountryCode = async (req, res, next) => {
//     try {
//       const { Ids } = req.body;
//       Ids.map(async (item) => {
//         const id = new mongoose.Types.ObjectId(item);
//         const Countrycode = await CountryCode.findById(id);
//         deleteFiles(Countrycode.countryflag);
//         await CountryCode.deleteOne({ _id: id });
//       });
       
//       res.status(200).json({
//         success: true,
//         message: "All selected country code deleted successfully.!",
//         // data: result,
      
//       });
//     } catch (error) {
//       next(error);
//     }
//   };


// const updateCountryCodeStatus= async (req, res) => {
 
//     try {
//       const id = new mongoose.Types.ObjectId(req.params.id);
//       const code = await CountryCode.findById(id);
  
//       if (!code) {
//         throw new Error("User not found!");
//       }
  
//       code.status = !code.status;
//       const result = await code.save();
  
//       res.status(200).json({
//         success: true,
//         message: "code Status Update successfully!!",
//         data: result,
      
//       });
//     } catch (err) {
//       next(err);
//     }

// };

module.exports = {
  createCountry
};