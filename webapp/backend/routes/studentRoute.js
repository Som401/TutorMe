const express = require("express");
const studentRoute = express.Router();

const {
  postStudent,
  getStudents,
  getOneStudent,
  putStudent,
  deleteStudent,
  login,
} = require("../Controllers/studentController");

studentRoute.get("/students", getStudents);
studentRoute.post("/students/register", postStudent);
studentRoute.post("/students/login", login);
studentRoute.put("/students/:StudentID", putStudent);
studentRoute.delete("/students/:StudentID", deleteStudent);
studentRoute.get("/students/:StudentID", getOneStudent);

module.exports = studentRoute;
