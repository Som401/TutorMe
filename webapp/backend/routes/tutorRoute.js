const express = require("express");
const tutorRoute = express.Router();

const {
    getTutors,
    postTutor,
    getOneTutorByStudentID,
} = require("../Controllers/tutorController");

tutorRoute.get("/tutors", getTutors);
tutorRoute.post("/tutors", postTutor);
tutorRoute.get("/tutors/:studentID", getOneTutorByStudentID);

module.exports = tutorRoute;
