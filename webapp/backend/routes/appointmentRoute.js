const express = require("express");
const appointmentRoute = express.Router();

const {
    getAppointmentsbyTutorId,
    postAppointment,
    updateAppointmentState,
    getExstudents,
    getAppointmentsbyStudentId,
    getDoneAppointments,
    putAppointmentsAuto,
    getRequestsByStudentId,
    getAppointmentsBySubjectID
} = require("../Controllers/appointmentController");

const isAuth = require("../middleware/isAuth")
const isAutho = require("../middleware/isAutho")

appointmentRoute.get("/appointments/:state/:tutorID", getAppointmentsbyTutorId);
appointmentRoute.get("/requests/:studentID", getRequestsByStudentId);
appointmentRoute.get("/studentappointments/:state/:studentID", getAppointmentsbyStudentId);
appointmentRoute.get("/appointmentsBysubject/:subjectID", getAppointmentsBySubjectID);
appointmentRoute.get("/appointments/:tutorID", getExstudents);
appointmentRoute.get("/studentappointments/:studentID", getDoneAppointments);

appointmentRoute.post("/appointments", isAuth,isAutho(['student']),postAppointment);
appointmentRoute.put("/appointments/:appointmentID/:state", updateAppointmentState);

appointmentRoute.put("/appointments", putAppointmentsAuto);
module.exports = appointmentRoute;
