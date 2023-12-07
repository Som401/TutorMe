const express = require("express");
const ratingRoute = express.Router();

const {
    getRatings,
    postRating,
    checkRatingExists,
    updateRating
} = require("../Controllers/ratingController");

ratingRoute.get("/ratings/:tutorID", getRatings);
ratingRoute.post("/ratings", postRating);
ratingRoute.post("/ratings", postRating);
ratingRoute.get('/ratings/:tutorEmail/:studentName', checkRatingExists);
ratingRoute.put('/ratings/:tutorEmail/:studentName', updateRating);

module.exports = ratingRoute;
