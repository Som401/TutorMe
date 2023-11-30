const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Application = require("../models/Application");
const Subject = require("../models/Subject");

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
      const { studentID, subjectName, subjectGrade} = request.body;
      const subject = await Subject.findOne({where:{ SubjectName: subjectName }});
      if (!subject) {
          return response.status(400).json({ msg: "Subject not found" });
      }
      const newApplication = {
        StudentID:studentID,
        SubjectID: subject.SubjectID ,
        SubjectGrade:subjectGrade,
        Result: "Pending",
        SendingDate:new Date()
      };
  
      await Application.create(newApplication);
      response.status(201).json({ msg: "Application submitted successfully." });
    } catch (error) {
      console.error("Error on submitting application:", error);
      response.status(500).json({ msg: "Error on submitting application.", error: error.message });
    }
  };

  const putApplication = async (req, res) => {
    const id = req.params.ApplicationID;
    const { result } = req.body; 

    try {
        const [updateCount] = await Application.update(
            { Result: result },
            { where: { ApplicationID: id, Result: 'Pending' } }
        );

        if (updateCount > 0) {
            res.status(200).json({ msg: "Application result updated successfully" });
        } else {
            res.status(404).json({ msg: "Application not found or already updated" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error on updating application result", error: error.message });
    }
};


  module.exports={getApplications,postApplication,putApplication};