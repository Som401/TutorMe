const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Application = require("../models/Application");
const { QueryTypes } = require("sequelize");

const getApplications = async (request, response) => {
    try {
      const applications = await sequelize.query("SELECT * FROM applications", {
        type: QueryTypes.SELECT,
      });
      response.status(200).json({ applications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      response
        .status(500)
        .json({ msg: "Error on getting applications", error: error.message });
    }
  };

  const postApplication = async (request, response) => {
    try {
      const { studentId, subjectId, subjectGrade} = request.body;

      const newApplication = {
        studentId,
        subjectId,
        subjectGrade,
        status: "Pending",
        sendingDate:new Date()
      };
  
      await Application.create(newApplication);
      response.status(201).json({ msg: "Application submitted successfully." });
    } catch (error) {
      console.error("Error on submitting application:", error);
      response.status(500).json({ msg: "Error on submitting application.", error: error.message });
    }
  };

  module.exports={getApplications,postApplication};