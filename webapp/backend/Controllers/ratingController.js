const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Rating = require("../models/Rating");
const { QueryTypes } = require("sequelize");

const getRatings = async (request, response) => {
    try {
      const ratings = await sequelize.query("SELECT * FROM ratings", {
        type: QueryTypes.SELECT,
      });
      response.status(200).json({ ratings });
    } catch (error) {
      console.error("Error fetching ratings:", error);
      response
        .status(500)
        .json({ msg: "Error on getting ratings", error: error.message });
    }
  };

  module.exports={getRatings};