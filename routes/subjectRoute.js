const express = require("express");
const subjectRoute = express.Router();

const {
    getSubjects,
    postSubject
} = require("../Controllers/subjectController");

subjectRoute.get("/subjects", getSubjects);
subjectRoute.post("/subjects", postSubject);

module.exports = subjectRoute;
