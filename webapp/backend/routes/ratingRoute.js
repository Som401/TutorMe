const express = require("express");
const ratingRoute = express.Router();

const {
    getRatings,
    postRating,
    checkRatingExists,
    updateRating
} = require("../Controllers/ratingController");

const isAuth = require("../middleware/isAuth")
const isAutho = require("../middleware/isAutho")

ratingRoute.get("/ratings/:tutorID", getRatings);
ratingRoute.post("/ratings",isAuth,isAutho(['student']), postRating);
ratingRoute.get('/ratings/:tutorEmail/:studentEmail', checkRatingExists);
ratingRoute.put('/ratings/:existingRatingId', updateRating);

module.exports = ratingRoute;
