const express = require("express");
const studentRoute = express.Router();

const {
    getStudents,
    putStudent,
    } = require("../Controllers/studentController");
    
studentRoute.get("/student/:Id", getStudents);
studentRoute.put("/", putStudent);

module.exports = studentRoute;
