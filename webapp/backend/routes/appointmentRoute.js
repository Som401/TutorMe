const express = require("express");
const appointmentRoute = express.Router();

const {
    getAppointments
} = require("../Controllers/appointmentController");

appointmentRoute.get("/appointments", getAppointments);

module.exports = appointmentRoute;
