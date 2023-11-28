const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Tutor = require("../models/Tutor");
const { QueryTypes } = require("sequelize");

const getTutors = async (request, response) => {
    try {
      const tutors = await sequelize.query("SELECT * FROM tutors", {
        type: QueryTypes.SELECT,
      });
      response.status(200).json({ tutors });
    } catch (error) {
      console.error("Error fetching tutors:", error);
      response
        .status(500)
        .json({ msg: "Error on getting tutors", error: error.message });
    }
  };

  const postTutor = async (request, response) => {
    try {
    const newTutor = request.body;
    const createdTutor = await Tutor.create(newTutor);
    response.status(200).json({ tutor: createdTutor, msg: "Tutor addedsuccessfully" });
    } catch (error) {
    console.error("Error on adding tutor:", error);
    response
    .status(500)
    .json({ msg: "Error on adding tutor", error: error.message });
    }
    };
    

  module.exports={getTutors,postTutor};