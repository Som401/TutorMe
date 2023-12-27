const express = require("express");
const applicationRoute = express.Router();

const {
    getApplications,
    postApplication,
    putApplication,
    getApplicationsByID,
    deleteApplicationByStudentID
} = require("../Controllers/applicationController");

const isAuth = require("../middleware/isAuth")
const isAutho = require("../middleware/isAutho")

applicationRoute.get("/applications/:id", getApplicationsByID);
applicationRoute.get("/applications", getApplications);

applicationRoute.post("/application",isAuth,isAutho(['student']), postApplication);

applicationRoute.put("/applications/:requestID/:result", putApplication);

applicationRoute.delete("/applications/:studentID",deleteApplicationByStudentID);

module.exports = applicationRoute;
