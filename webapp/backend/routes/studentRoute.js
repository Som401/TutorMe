const express = require("express");
const studentRoute = express.Router();

const {
  postStudent,
  getStudents,
  getOneStudent,
  putStudent,
  deleteStudent,
} = require("../Controllers/studentController");

studentRoute.get("/students", getStudents);
studentRoute.put("/students/:Id", putStudent);
studentRoute.post("/students/:Id", deleteStudent);
studentRoute.post("/students", postStudent);
studentRoute.post("/students/:Id", getOneStudent);

module.exports = studentRoute;
