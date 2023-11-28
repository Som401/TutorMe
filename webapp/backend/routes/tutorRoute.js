const express = require("express");
const tutorRoute = express.Router();

const {
    getTutors
} = require("../Controllers/tutorController");

tutorRoute.get("/tutors", getTutors);

module.exports = tutorRoute;
