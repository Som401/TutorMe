const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Subject = require("../models/Subject");
const { QueryTypes } = require("sequelize");

const getSubjects = async (request, response) => {
    try {
      const subjects = await sequelize.query("SELECT * FROM subjects", {
        type: QueryTypes.SELECT,
      });
      response.status(200).json({ subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      response
        .status(500)
        .json({ msg: "Error on getting subjects", error: error.message });
    }
  };

  module.exports={getSubjects};