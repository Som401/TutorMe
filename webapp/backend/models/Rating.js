const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");
const Student = require("./Student");
const Tutor = require("./Tutor");

const Rating = sequelize.define('Ratings', {
    RateID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{ timestamps: false },);

Rating.belongsTo(Tutor, { foreignKey: 'TutorID' , targetKey: 'TutorID' });
Rating.belongsTo(Student, { foreignKey: 'StudentID', targetKey: 'StudentID' });

module.exports = Rating;
