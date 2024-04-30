// const Patient = require(");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Patient } = require("../models");
// const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const refreshSecret = "cdccsvavsvfssbtybnjnukiradhe";

/* ------------------------------ Access Token ------------------------------ */

const accessToken = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(
        res.status(401).json({
          status: 401,
          message: "Please authenticate! with accessToken",
        })
      );
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    if (!decoded) {
      return next(new Error("Please enter valid token!"));
    }
    const patient = await Patient.findOne({ email: decoded.email });

    if (!patient) {
      return next(new Error("Please authenticate!"));
    }
    req.patient = patient;
    req.token = token;

    next();
  } catch (error) {
    return next(
      res.status(401).json({
        status: 401,
        message: "Invalid token! Please authenticate with a valid accessToken",
      })
    );
  }
};
/* ------------------------------ refresh Token ------------------------------ */

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not provided" });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );

    if (!decoded) {
      return next(new Error("Please enter valid token!"));
    }

    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    next();

    res.json({ refreshToken: refreshToken, newAccessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = { accessToken, refreshToken };
