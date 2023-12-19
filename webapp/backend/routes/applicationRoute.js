const express = require("express");
const applicationRoute = express.Router();

const {
    getApplications,
    postApplication,
    putApplication,
    getApplicationsByID,
    deleteApplicationByStudentID
} = require("../Controllers/applicationController");

applicationRoute.get("/applications/:id", getApplicationsByID);
applicationRoute.get("/applications", getApplications);
applicationRoute.post("/application", postApplication);
applicationRoute.put("/applications/:RequestID/:result", putApplication);
applicationRoute.delete("/applications/:studentID",deleteApplicationByStudentID);

module.exports = applicationRoute;
