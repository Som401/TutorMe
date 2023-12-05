const express = require("express");
const appointmentRoute = express.Router();

const {
    getAppointmentsbyTutorId,
    postAppointment,
    updateAppointmentState,
    getExstudents,
    getAppointmentsbyStudentId,
    putAppointmentsAuto
} = require("../Controllers/appointmentController");

appointmentRoute.get("/appointments/:state/:tutorID", getAppointmentsbyTutorId);
appointmentRoute.get("/studentappointments/:state/:studentID", getAppointmentsbyStudentId);
appointmentRoute.post("/appointments", postAppointment);
appointmentRoute.put("/appointments/:appointmentID/:state", updateAppointmentState);
appointmentRoute.get("/appointments/:tutorID", getExstudents);
appointmentRoute.put("/appointments", putAppointmentsAuto);
module.exports = appointmentRoute;
