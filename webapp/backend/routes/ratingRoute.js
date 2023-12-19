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
ratingRoute.get('/ratings/:tutorEmail/:studentEmail', checkRatingExists);
ratingRoute.put('/ratings/:existingRatingId', updateRating);

module.exports = ratingRoute;
