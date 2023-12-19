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
  updateUserProfileImagePath,
} = require("../Controllers/studentController");

const isAuth = require("../middleware/isAuth")
const isAutho = require("../middleware/isAutho")

studentRoute.post("/students/uploads/:StudentID", upload.single('file'),updateUserProfileImagePath);
studentRoute.get("/students", getStudents);
studentRoute.post("/students", postStudent);
studentRoute.post("/login", login);
studentRoute.put("/students/:StudentID",  isAuth,isAutho(['student']),putStudent);
studentRoute.delete("/students/:StudentID", deleteStudent);
studentRoute.get("/students/:StudentID",  isAuth,isAutho(['student']), getOneStudent);

module.exports = studentRoute;
