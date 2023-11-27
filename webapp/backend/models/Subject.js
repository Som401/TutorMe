const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");

const Subject = sequelize.define('Subject', {
    SubjectID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    SubjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AcademicLevel: {
        type: DataTypes.STRING,
    },
});

module.exports = Subject;
