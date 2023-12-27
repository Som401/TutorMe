const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");
const Subject = require("./Subject");
const Tutor = require("./Tutor");
const Student = require("./Student");

const Appointment = sequelize.define('Appointments', {
    AppointmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
    },
    Location: {
        type: DataTypes.STRING,
    },
    Date: {
        type: DataTypes.DATE,
    },
},
{ timestamps: false },
);

Appointment.belongsTo(Tutor, { foreignKey: 'TutorID' });
Appointment.belongsTo(Student, { foreignKey: 'StudentID' });

module.exports = Appointment;
