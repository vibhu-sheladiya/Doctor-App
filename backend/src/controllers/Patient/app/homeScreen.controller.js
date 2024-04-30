/* --------------------------- PATIENT HOME SCREEN -------------------------- */

const { Doctor, Specialist, AppointmentBook } = require("../../../models");



/* ----------------------------- All Doctor List Rating Wise Filter ----------------------------- */
const allDoctorList = async (req, res) => {
  try {
    // Fetch all doctors along with their ratings and specialities
    const doctorsData = await Doctor.aggregate([
      {
        $lookup: {
          from: "appointmentbooks",
          localField: "_id",
          foreignField: "doctorid",
          as: "appointments",
        },
      },
      {
        $lookup: {
          from: "specialists",
          localField: "specialist",
          foreignField: "_id",
          as: "specialistInfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          speciality: "$specialistInfo.name",
          // Calculate average rating
          averageRating: {
            $avg: "$appointments.rating",
          },
        },
      },
      {
        // Sort by rating in descending order
        $sort: {
          averageRating: -1,
        },
      },
    ]);

    // If no doctors found, return 404
    if (!doctorsData || doctorsData.length === 0) {
      return res.status(404).json({ message: "Doctor list not found" });
    }

    // Add sorting for doctors with no ratings
    const doctorsWithRatings = doctorsData.filter((doctor) => doctor.averageRating !== null);
    const doctorsWithoutRatings = doctorsData.filter((doctor) => doctor.averageRating === null);

    const sortedDoctors = [...doctorsWithRatings, ...doctorsWithoutRatings];

    const baseUrl =
      req.protocol +"://" +req.get("host") +process.env.BASE_URL_PROFILE_PATH;

    res.status(200).json({
      status:200,
      success: true,
      message: "Doctor data fetched successfully",
      doctors: sortedDoctors,
      baseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

/* -------------- All Specilaist List At Home Screen Of Patient ------------- */

const allSpecialList = async (req, res) => {
  try {
    const userData = await Specialist.find();

    if (!userData) {
      return res.status(404).json({ message: "Specialist list data not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Specialist data get successfully ",
      user: userData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

/* ----------- SEARCH FILTER WITH CITY AND SPECIALIST(SEARCH API) ----------- */
const searchDoctorSpecialist = async (req, res) => {
  try {
    const { query } = req.query;

    // Check if query parameter is provided
    if (!query) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Query parameter is missing.",
      });
    }

    // Use regular expression for case-insensitive search
    const regex = new RegExp(query, "i");

    // Search for the Specialist ObjectId based on the provided query
    const specialist = await Specialist.findOne({ name: regex });

    // Search for doctors matching the city
    const doctorsByCity = await Doctor.find({ city: regex });

    let combinedResults = [];

    // If a specialist is found, search for doctors by the specialist
    if (specialist) {
      const doctorsBySpecialist = await Doctor.find({ specialist: specialist._id });
      combinedResults = [...doctorsBySpecialist, ...doctorsByCity];
    } else {
      combinedResults = doctorsByCity;
    }

    if (combinedResults.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No matching doctors or specialists found for the given query.",
      });
    }

    // Fetching reviews for each doctor and calculating average rating
    const populatedDoctors = await Promise.all(
      combinedResults.map(async (doctor) => {
        const doctorWithReview = doctor.toObject(); // Convert to plain JavaScript object
        const reviews = await AppointmentBook.find({ doctorid: doctor._id }).populate('patientid', 'name image').select('review rating');
        
        // Calculate average rating
        let totalRating = 0;
        reviews.forEach(review => {
          totalRating += review.rating;
        });
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        
        doctorWithReview.reviews = reviews;
        doctorWithReview.averageRating = averageRating;
        return doctorWithReview;
      })
    );

    // Sort the populatedDoctors array by averageRating
    populatedDoctors.sort((a, b) => b.averageRating - a.averageRating);

    // If results are found, return a success response with the combined search results
    res.status(200).json({
      status: 200,
      success: true,
      message: "Search data retrieved successfully.",
      searchResults: populatedDoctors,
    });
  } catch (error) {
    // console.error("Error in searchDoctorSpecialistCity:", error);
    res.status(500).json({status:500, success: false, error: "Internal Server Error" });
  }
};

 





  

module.exports = {
  allDoctorList,
  allSpecialList,
  searchDoctorSpecialist,
};
