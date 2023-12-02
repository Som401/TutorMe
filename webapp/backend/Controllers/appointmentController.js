const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Appointment = require("../models/Appointment");
const { QueryTypes } = require("sequelize");

const getAppointments = async (request, response) => {
    try {
      const appointments = await sequelize.query("SELECT * FROM appointments", {
        type: QueryTypes.SELECT,
      });
      response.status(200).json({ appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      response
        .status(500)
        .json({ msg: "Error on getting appointments", error: error.message });
    }
  };
  const postAppointment = async (request, response) => {
    try {
        const { time, location, subjectID, tutorID, studentID } = request.body;
        const newAppointment = await Appointment.create({
            State:"pending",
            Time:time,
            Location:location,
            SendingDate:new Date(),
            SubjectID:subjectID,
            TutorID:tutorID,
            StudentID:studentID
        });
        response.status(201).json({ appointment: newAppointment, msg: "Appointment created successfully" });
    } catch (error) {
        console.error("Error creating appointment:", error);
        response.status(500).json({ msg: "Error creating appointment", error: error.message });
    }
};

  module.exports={getAppointments,postAppointment};