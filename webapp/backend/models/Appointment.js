const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");
const Subject = require("./Subject");
const Tutor = require("./Tutor");
const Student = require("./Student");

const Appointment = sequelize.define('Appointment', {
    AppointmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    State: {
        type: DataTypes.STRING,
    },
    Time: {
        type: DataTypes.DATE,
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

Appointment.belongsTo(Subject, { foreignKey: 'SubjectID' });
Appointment.belongsTo(Tutor, { foreignKey: 'TutorID' });
Appointment.belongsTo(Student, { foreignKey: 'StudentID' });

module.exports = Appointment;
