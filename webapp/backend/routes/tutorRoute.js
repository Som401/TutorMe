const express = require("express");
const tutorRoute = express.Router();

const {
    getTutors,
    postTutor,
    getOneTutorByStudentID,
    getTutorsBySubjectID,
    deleteTutor
} = require("../Controllers/tutorController");

tutorRoute.get("/tutors", getTutors);
tutorRoute.get("/tutorsBysubject/:subjectID", getTutorsBySubjectID);
tutorRoute.post("/tutors/:studentID/:subjectID", postTutor);
tutorRoute.get("/tutors/:studentID", getOneTutorByStudentID);
tutorRoute.delete("/tutors/:id", deleteTutor);
module.exports = tutorRoute;
