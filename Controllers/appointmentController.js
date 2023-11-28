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

  module.exports={getAppointments};