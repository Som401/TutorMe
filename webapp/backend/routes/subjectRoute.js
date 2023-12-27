const express = require("express");
const subjectRoute = express.Router();

const {
    getSubjects,
    postSubject,
    getOneSubjectByName,
    getOneSubjectByID,
    deleteSubject
} = require("../Controllers/subjectController");

subjectRoute.get("/subjects", getSubjects);
subjectRoute.get("/subjects/:subjectName", getOneSubjectByName);
subjectRoute.get("/subjectID/:id", getOneSubjectByID);
subjectRoute.post("/subjects/:subjectName", postSubject);
subjectRoute.delete("/subjects/:id", deleteSubject);

module.exports = subjectRoute;
