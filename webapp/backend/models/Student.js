const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");

const Student = sequelize.define(
  "students",
  {
    StudentID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AcademicLevel: {
      type: DataTypes.STRING,
    },
    Photo: {
      type: DataTypes.BLOB("long"),
    },
    UserType: {
      type: DataTypes.ENUM("student", "admin"),
      defaultValue: "student",
    },
  },
  { timestamps: false }
);
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = Student;

/*const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };*/
