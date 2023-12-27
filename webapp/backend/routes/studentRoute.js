const express = require("express");
const studentRoute = express.Router();
const upload = require('../multerConfigutaion/multerConfiguration'); 

const {
  postStudent,
  getStudents,
  getOneStudent,
  putStudent,
  deleteStudent,
  login,
} = require("../Controllers/studentController");

const isAuth = require("../middleware/isAuth")
const isAutho = require("../middleware/isAutho")

studentRoute.get("/students", getStudents);
studentRoute.post("/students", postStudent);
studentRoute.post("/login", login);
studentRoute.put("/students/:StudentID",  isAuth,isAutho(['student']),putStudent);
studentRoute.delete("/students/:StudentID", deleteStudent);
studentRoute.get("/students/:StudentID", getOneStudent);

module.exports = studentRoute;
