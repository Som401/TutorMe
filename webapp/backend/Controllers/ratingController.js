const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Rating = require("../models/Rating");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");

const { QueryTypes } = require("sequelize");

const getRatings = async (request, response) => {
  try {
    const { tutorID } = request.params;

    const ratings = await Rating.findAll({
      attributes: [
        "TutorID",
        [sequelize.fn("AVG", sequelize.col("Rate")), "averageRating"], // Calculate average rating
      ],
      where: {
        TutorID: tutorID,
      },
      group: ["TutorID"],
    });

    response.status(200).json({ AvgRate: ratings[0].dataValues.averageRating });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    response
      .status(500)
      .json({ msg: "Error fetching ratings", error: error.message });
  }
};
const postRating = async (request, response) => {
  try {
    const { rating, tutorEmail, studentEmail } = request.body;
    const student = await Student.findOne({
      where: {
        Email: studentEmail,
      },
    });
    const student2 = await Student.findOne({
      where: {
        Email: tutorEmail,
      },
    });
    const tutor = await Tutor.findOne({
      where: {
        StudentID: student2.StudentID,
      },
    });
    const newAppointment = await Rating.create({
      TutorID: tutor.TutorID,
      StudentID: student.StudentID,
      Rate: rating,
    });

    response
      .status(201)
      .json({
        appointment: newAppointment,
        msg: "Appointment created successfully",
      });
  } catch (error) {
    console.error("Error creating appointment:", error);
    response
      .status(500)
      .json({ msg: "Error creating appointment", error: error.message });
  }
};

const checkRatingExists = async (request, response) => {
  try {
    const { tutorEmail, studentEmail } = request.params;

    if (!tutorEmail || !studentEmail) {
      return response
        .status(400)
        .json({ msg: "Missing tutorEmail or studentEmail in request" });
    }
    const student = await Student.findOne({
      where: {
        Email: studentEmail,
      },
    });

    const student2 = await Student.findOne({
      where: {
        Email: tutorEmail,
      },
    });

    const tutor = await Tutor.findOne({
      where: {
        StudentID: student2.StudentID,
      },
    });

    if (!student || !tutor) {
      return response.status(404).json({ msg: "Student or Tutor not found" });
    }

    // Check if a rating exists for the tutor and student
    const existingRating = await Rating.findOne({
      where: {
        TutorID: tutor.TutorID,
        StudentID: student.StudentID,
      },
    });

    if (existingRating) {
      response.status(200).json({ rateID: existingRating.RateID }); // Send the ID of the existing rating
    } else {
      response.status(200).json(null); // No rating found
    }
  } catch (error) {
    console.error("Error checking rating existence:", error);
    response
      .status(500)
      .json({ msg: "Error checking rating existence", error: error.message });
  }
};

const updateRating = async (request, response) => {
  try {
    const { rating } = request.body;  
    const { existingRatingId } = request.params;

    const updatedRating = await Rating.findByPk(existingRatingId);

    if (!updatedRating) {
      return response.status(404).json({ msg: "Rating not found" });
    }

    // Update the existing rating
    updatedRating.Rate = rating;
    await updatedRating.save();

    response.status(200).json({ msg: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    response
      .status(500)
      .json({ msg: "Error updating rating", error: error.message });
  }
};

module.exports = { getRatings, postRating, checkRatingExists, updateRating };
