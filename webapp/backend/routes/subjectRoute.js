const express = require("express");
const subjectRoute = express.Router();

const {
    getSubjects
} = require("../Controllers/subjectController");

subjectRoute.get("/subjects", getSubjects);

module.exports = subjectRoute;
