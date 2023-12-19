const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Application = require("../models/Application");
const Subject = require("../models/Subject");
const Student = require("../models/Student");

const { QueryTypes } = require("sequelize");

const getApplicationsByID = async (request, response) => {
  try {
    const { id } = request.params;
      const applications = await sequelize.query(
      "SELECT * FROM applications WHERE StudentID = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications by email:", error);
    response.status(500).json({
      msg: "Error getting applications by email",
      error: error.message,
    });
  }
};



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
      const { email, subjectName, subjectGrade} = request.body;
      const subject = await Subject.findOne({where:{ SubjectName: subjectName }});
      if (!subject) {
          return response.status(400).json({ msg: "Subject not found" });
      }
      const student = await Student.findOne({
        where: {
          Email: email,
        },
      });
      const newApplication = {
        StudentID:student.StudentID,
        SubjectID: subject.SubjectID ,
        SubjectGrade:subjectGrade,
        Result: "Pending",
      };
  
      await Application.create(newApplication);
      response.status(201).json({ msg: "Application submitted successfully." });
    } catch (error) {
      console.error("Error on submitting application:", error);
      response.status(500).json({ msg: "Error on submitting application.", error: error.message });
    }
  };

  const putApplication = async (req, res) => {
    const {id,result} = req.params;

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

const deleteApplicationByStudentID = async (request, response) => {
  try {
    const { studentID } = request.params;

    const deletedCount = await Application.destroy({
      where: {
        StudentID: studentID,
      },
    });

    if (deletedCount === 0) {
      return response.status(404).json({ msg: "No applications found for this student." });
    }

    response.status(200).json({ msg: "Applications deleted successfully." });
  } catch (error) {
    console.error("Error deleting applications:", error);
    response.status(500).json({ msg: "Error deleting applications.", error: error.message });
  }
};
  module.exports={getApplicationsByID,getApplications,postApplication,putApplication,deleteApplicationByStudentID};