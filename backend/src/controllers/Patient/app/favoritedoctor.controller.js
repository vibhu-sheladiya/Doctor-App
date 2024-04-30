const {  AppointmentBook } = require("../../../models");
const FavoriteDoctor = require("../../../models/favoritedoctor.model");

/* -------------------- CREATE FAVORITE DOCTOR BY PATIENT ------------------- */
const createFavoriteDoctor = async (req, res) => {
  try {
    const reqBody = req.body;
    const doctorId = reqBody.doctorid; // Assuming doctorid is present in the request body

    // Check if the doctor is already in the favorite list
    const existingFavorite = await FavoriteDoctor.findOne({
      doctorid: doctorId,
    }); 

    if (existingFavorite) {
      // Remove favorite if it already exists
      await FavoriteDoctor.findOneAndDelete({ doctorid: doctorId }); 
      res.status(200).json({
        status:200,
        message: "Successfully removed doctor from favorites",
        success: true,
        data: existingFavorite,
      });
    } else {
      // Add doctor to favorites
      const appointment = await FavoriteDoctor.create(reqBody);
      if (!appointment) {
        throw new Error("Failed to create appointment");
      }
      res.status(201).json({
        status: 201,
        message: "Created a new appointment successfully",
        success: true,
        data: appointment,
      });
    }
  } catch (error) {
    res.status(400).json({status:400, success: false, message: error.message });
  }
};
/* ------------------------------ FAVORITE LIST ----------------------------- */
const getFavoriteDoctorList = async (req, res) => {
  try {
    const reqbody = req.body;

    // Fetch favorite doctors with specialist populated
    const favoriteDoctors = await FavoriteDoctor.find().populate({
      path: "doctorid",
      populate: [{ path: "specialist", model: "specialist" }],
    });

    let appointmentDetails = [];
    if (favoriteDoctors.length === 0) {
      // If favoriteDoctors is empty, set appointmentDetails as empty
      appointmentDetails = [];
    } else {
      // Fetch appointment details only if favoriteDoctors is not empty
      appointmentDetails = await AppointmentBook.find({
        doctorid: reqbody.doctorid, // Use reqbody.doctorId consistently
      })
        .populate({
          path: "patientid",
          select: "name image", // Select the fields you want to populate
        })
        .select("rating review doctorid patientid");
    }

    // Calculate average rating and review for each doctor
    const doctorAverages = favoriteDoctors.map((favoriteDoctor) => {
      const doctorId = favoriteDoctor.doctorid._id.toString();
      const doctorAppointments = appointmentDetails.filter(
        (appointment) => appointment.doctorid.toString() === doctorId
      );

      const totalRating = doctorAppointments.reduce(
        (acc, appointment) => acc + appointment.rating,
        0
      );
      const totalReviews = doctorAppointments.length;

      const averageRating =
        totalReviews > 0 ? totalRating / totalReviews : 0;

      return {
        doctorId,
        averageRating,
        totalReviews,
      };
    });

    res.status(200).json({
      status:200,
      success: true,
      data: {
        favoriteDoctors,
        appointments: appointmentDetails,
        doctorAverages,
      },
      message: "Doctor details and appointments retrieved successfully!",
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      status: error?.statusCode || 400,
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};


module.exports = {
  createFavoriteDoctor,
  getFavoriteDoctorList,
};
