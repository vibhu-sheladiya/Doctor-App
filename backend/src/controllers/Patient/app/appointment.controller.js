const AppointmentBook = require("../../../models/appointmentbook.model");

/* --------------------------- CREATE APPOINTMENT --------------------------- */
const createAppointment = async (req, res) => {
  try {
    const reqBody = req.body;
    // Generate a 6-digit random number
    const uniqueid = Math.floor(100000 + Math.random() * 900000);

    // Add the uniqueid to the request body
    reqBody.uniqueid = uniqueid;

    // Extract and format the date from reqBody
    const appointmentDateParts = reqBody.appointmentdate.split("-");
    const year = parseInt(appointmentDateParts[2]);
    const month = parseInt(appointmentDateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(appointmentDateParts[0]);
    const appointmentDate = new Date(Date.UTC(year, month, day));

    // Assign the exact date to the request body
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

    const appointment = await AppointmentBook.create(reqBody);
    if (!appointment) {
      throw new Error("No such appointment");
    }
    res.status(200).json({
      status:200,
      message: "Created a new appointment successfully",
      success: true,
      data: appointment,
      appointmentId: appointment._id
    });
  } catch (error) {
    res.status(400).json({status:400, success: false, message: error.message });
  }
};

/* ------------------------EXTRA GET ALL APPOINTMENT LIST ------------------------ */
const getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentBook.find()
      .populate("patientid")
      .populate("doctorid");
    res.status(200).json({status:200, success: true, data: appointments });
  } catch (error) {
    res.status(500).json({status:500, success: false, error: error.message });
  }
};

/* ---------------- LIST UPCOMMINT OF APPOINTMENT FOR PATIENT --------------- */
const getAppointmentstatus = async (req, res) => {
  try {
    const appointments = await AppointmentBook.find({ appointmentstatus: 0 })
      .populate("patientid")
      .populate("doctorid");
    res.status(200).json({status:200, success: true, data: appointments });
  } catch (error) {
    res.status(500).json({status:500, success: false, error: error.message });
  }
};
/* ---------------- LIST COMPLETE OF APPOINTMENT FOR PATIENT --------------- */
const getAppointmentstatusComplete = async (req, res) => {
  try {
    const appointments = await AppointmentBook.find({ appointmentstatus: 2 })
      .populate("patientid")
      .populate("doctorid");
    res.status(200).json({status:200, success: true, data: appointments });
  } catch (error) {
    res.status(500).json({status:500, success: false, error: error.message });
  }
};
/* ---------------- LIST RUNNING OF APPOINTMENT FOR PATIENT AND DOCTOR(EXTRA) --------------- */
const getAppointmentstatusVideoChatSms = async (req, res) => {
  try {
    const appointments = await AppointmentBook.find({ appointmentstatus: 1 })
      .populate("patientid")
      .populate("doctorid");
    res.status(200).json({status:200, success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ status:200,success: false, error: error.message });
  }
};

 /* ------------------ LIST DOCTOR ID ONLY APPOINTMENT EXTRA ----------------- */
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentBook.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ status:404, success: false, error: "Appointment not found" });
    }
    res.status(200).json({status:200, success: true, data: appointment });
  } catch (error) {
    res.status(500).json({status:500, success: false, error: error.message });
  }
  
};

/* --------------------- UPDATE REVIEW RATING BY PATIENT -------------------- */
const updateAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentBook.findByIdAndUpdate(
      req.body.appointmentId,
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res
        .status(404)
        .json({status:404, success: false, error: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Update review and rating done",
      data: appointment,
      appointmentId: appointment._id

    });
  } catch (error) {
    res.status(500).json({status:500, success: false, error: error.message });
  }
};
/* --------------------- UPDATE RESCHEDULE BY PATIENT -------------------- */
const updateRescheduleAppointment = async (req, res) => {
  try {
    const reqBody = req.body; // Assuming reqBody is defined or extracted from req previously

    const appointmentDateParts = reqBody.appointmentdate.split("-");
    const year = parseInt(appointmentDateParts[2]);
    const month = parseInt(appointmentDateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(appointmentDateParts[0]);
    const appointmentDate = new Date(Date.UTC(year, month, day));

    // Assign the exact date to the request body
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

    // Assign the exact time to the request body
    reqBody.appointmenttime = appointmentTime;

    const appointment = await AppointmentBook.findByIdAndUpdate(
      reqBody.appointmentId,
      reqBody,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ status: 404, success: false, error: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Appointment rescheduled successfully",
      data: appointment,
      appointmentId: appointment._id
    });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, error: error.message });
  }
};


module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  getAppointmentstatus,
  updateRescheduleAppointment,
  getAppointmentstatusComplete,
  getAppointmentstatusVideoChatSms,
};
