const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Tutor = require("../models/Tutor");
const Subject = require("../models/Subject");
const Student = require("../models/Student");

const { QueryTypes, where } = require("sequelize");

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


const getOneTutorByStudentID = async (request, response) => {
  
  try {
    const { studentID } = request.params; 
    const tutor = await sequelize.query(
      "SELECT TutorID FROM tutors WHERE StudentID = :studentID",
      {
        replacements: { studentID },
        type: QueryTypes.SELECT,
      }
    );

    if (tutor.length > 0) {
      
      response.status(200).json({ TutorID: tutor[0].TutorID });
    } else {
      response.status(200).json({ TutorID: -1 });
    }
  } catch (error) {
    console.error("Error fetching tutor:", error);
    response
      .status(500)
      .json({ msg: "Error on getting tutor", error: error.message });
  }
};

const postTutor = async (request, response) => {
  try {
    const { studentID, subjectName } = request.body;
    const subject = await Subject.findOne({
      where: { SubjectName: subjectName },
    });
    if (!subject) {
      return response.status(400).json({ msg: "Subject not found" });
    }
    const createdTutor = {
      StudentID: studentID,
      SubjectID: subject.SubjectID,
    };
    await Tutor.create(createdTutor);
    response
      .status(200)
      .json({ tutor: createdTutor, msg: "Tutor added successfully" });
  } catch (error) {
    console.error("Error on adding tutor:", error);
    response
      .status(500)
      .json({ msg: "Error on adding tutor", error: error.message });
  }
};

module.exports = { getTutors, postTutor,getOneTutorByStudentID };
