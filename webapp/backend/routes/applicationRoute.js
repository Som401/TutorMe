const express = require("express");
const applicationRoute = express.Router();

const {
    getApplications,
    postApplication
} = require("../Controllers/applicationController");

applicationRoute.get("/applications", getApplications);
applicationRoute.post("/applications", postApplication);

module.exports = applicationRoute;
