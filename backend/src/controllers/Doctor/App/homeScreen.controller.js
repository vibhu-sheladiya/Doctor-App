/* --------------------------- PATIENT HOME SCREEN -------------------------- */
const {
  Doctor,
  Specialist,
  AppointmentBook,
  Patient,
} = require("../../../models");

/* -------------- LIST PATIENT DATE WISE SHOW BY DOCTOR -------------- */
const allPatientAppointmentList = async (req, res) => {
  try {
    const { doctorid, appointmentdate } = req.body;

    // Check if both doctorid and appointmentdate are provided in the request body
    if (!doctorid || !appointmentdate) {
      return res.status(404).json({
        status: 404,
        success: false,
        message:
          "Both doctorid and appointmentdate are required in the request body",
      });
    }

    // Query the AppointmentBook model based on the provided doctorid and appointmentdate
    const userData = await AppointmentBook.find({ doctorid, appointmentdate })
      .populate({
        path: "doctorid",
        select: "name image", // Specify the fields you want to populate
      })
      .populate({
        path: "patientid",
        select:
          "name age image weight bloodgroup city phoneNumber symptoms gender", // Specify the fields you want to populate
      });

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message:
          "Doctor data not found for the provided doctorid and appointmentdate",
      });
    }

    // Convert appointmentdate to "YYYY-MM-DD" format
    const formattedUserData = userData.map((data) => ({
      ...data._doc,
      appointmentdate: data.appointmentdate.toISOString().split("T")[0],
      appointmenttime: formatAppointmentTime(data.appointmenttime),
    }));

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of Doctor Data successfully ",
      user: formattedUserData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
function formatAppointmentTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}${ampm}`;
}

/* ----------------- LIST OF ALL OVER PATIENT LIST BY DOCTOR ID ---------------- */
const PatientAppointmentList = async (req, res) => {
  try {
    const { doctorid } = req.body;

    // Check if both doctorid and appointmentdate are provided in the request body
    if (!doctorid) {
      return res.status(400).json({
        message:
          "Both doctorid and appointmentdate are required in the request body",
      });
    }

    // Query the AppointmentBook model based on the provided doctorid and appointmentdate
    const userData = await AppointmentBook.find({ doctorid })
      .populate({
        path: "doctorid",
        select: "name image", // Specify the fields you want to populate
      })
      .populate({
        path: "patientid",
        select:
          "name age image weight bloodgroup city phoneNumber symptoms gender", // Specify the fields you want to populate
      });

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        status: 400,
        success: false,
        message:
          "Doctor data not found for the provided doctorid and appointmentdate",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of Doctor Data successfully ",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

/* ------------------- LIST PATEINT REVIEW SHOW BY DOCTOR ------------------- */
const allPatientAppointmentListReview = async (req, res) => {
  try {
    const { doctorid } = req.body;

    // Check if both doctorid and appointmentdate are provided in the request body
    if (!doctorid) {
      return res.status(400).json({
        status: 400,
        success: false,
        message:
          "Both doctorid and appointmentdate are required in the request body",
      });
    }

    // Query the AppointmentBook model based on the provided doctorid and appointmentdate
    const userData = await AppointmentBook.find({ doctorid })
      .populate({
        path: "doctorid",
        select: "name", // Specify the fields you want to populate
      })
      .populate({
        path: "patientid",
        select: "name  image", // Specify the fields you want to populate
      })
      .select("review rating");

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        status: 404,
        success: fasle,
        message:
          "Doctor data not found for the provided doctorid and appointmentdate",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of Doctor Data successfully ",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- RESCHEDULE APPOINTMENT PATIENT BY DOCTOR ---------------- */
const updateAppointmentByDoctor = async (req, res) => {
  try {
    // Extracting appointmentdate from request body
    const { appointmentdate, ...reqBody } = req.body;

    // Converting appointmentdate to Date object
    const appointmentDateParts = appointmentdate.split("-");
    const year = parseInt(appointmentDateParts[2]);
    const month = parseInt(appointmentDateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(appointmentDateParts[0]);
    const appointmentDate = new Date(Date.UTC(year, month, day));

    // Assigning the exact date to the request body
    reqBody.appointmentdate = appointmentDate;

    // Validate appointmenttime format
    if (!/^\d{1,2}:\d{2}(am|pm)$/i.test(reqBody.appointmenttime)) {
      throw new Error(
        "Invalid appointment time format. Please provide the time in 'HH:mm(am/pm)' format."
      );
    }

    // Extract hours and minutes from the appointmenttime string
    const timeParts = reqBody.appointmenttime.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    // Adjust hours and minutes if 'pm' is specified
    if (reqBody.appointmenttime.includes("pm") && hours !== 12) {
      hours += 12;
    }

    // Create a new Date object with the time
    const appointmentTime = new Date(0, 0, 0, hours, minutes, 0, 0);
    appointmentTime.setUTCHours(hours, minutes, 0, 0);
    // Set year, month, and day to 0

    // Assign the exact time to the request body
    reqBody.appointmenttime = appointmentTime;

    const appointment = await AppointmentBook.findByIdAndUpdate(
      reqBody.appointmentId,
      reqBody,
      { new: true }
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Update review and rating successfully",
      data: appointment,
      appointmentId: appointment._id
    });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, error: error.message });
  }
};

/* -------------- COMPLETE APPOINTMENT STATUS UPDATE BY DOCTOR -------------- */
const updateAppointmentStatusByDoctor = async (req, res) => {
  try {
    const appointment = await AppointmentBook.findByIdAndUpdate(
      req.body.appointmentId,
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Update status successfully",
      data: appointment,
      appointmentId: appointment._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ------------------------ SEARCH PATIENT BY DOCTOR ------------------------ */
const searchPatientlist = async (req, res) => {
  try {
    const { query } = req.query;

    // Check if query parameter is provided
    if (!query) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Query parameter is missing.",
      });
    }
    // Use regular expression for case-insensitive search
    const regex = new RegExp(query, "i");

    // Search for patients based on the provided query
    const patients = await Patient.find({ name: regex });

    if (patients.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No patients found matching the query.",
      });
    }
    // Return the found patients
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Patients found.",
      data: patients,
    });
  } catch (error) {
    // Handle any errors that occur during the search
    // console.error("Error searching patients:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error.",
    });
  }
};
/* ----------------------------- Get particuler News search data ----------------------------- */
const searchDoctorSpecialist = async (req, res) => {
  try {
    const { query } = req.query;

    // Check if query parameter is provided
    if (!query) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Query parameter is missing.",
      });
    }
    // Use a regular expression for case-insensitive search
    const regex = new RegExp(query, "i");

    // Search in Doctor model
    const doctorResults = await Doctor.find({
      city: regex, // Adjust to match the field you are searching against
    });

    // Search in Specialist model
    const specialistResults = await Specialist.find({
      name: regex, // Adjust to match the field you are searching against
    });

    // Combine the results from both models
    const combinedResults = [...doctorResults, ...specialistResults];

    if (combinedResults.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message:
          "No matching doctors or specialists found for the given query.",
      });
    }
    // If results are found, return a success response with the combined search results
    res.status(200).json({
      status: 200,
      success: true,
      message: "Search data retrieved successfully.",
      searchResults: combinedResults,
    });
  } catch (error) {
    // console.error("Error in searchDoctorSpecialist:", error);
    res
      .status(500)
      .json({ status: 500, success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  allPatientAppointmentList,
  updateAppointmentByDoctor,
  searchDoctorSpecialist,
  updateAppointmentStatusByDoctor,
  PatientAppointmentList,
  allPatientAppointmentListReview,
  searchPatientlist,
};
