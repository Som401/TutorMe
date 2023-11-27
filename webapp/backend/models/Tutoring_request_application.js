const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");
const Student = require("./Student");
const Subject = require("./Subject");
const Admin = require("./Admin");

const TutoringRequestApplication = sequelize.define('TutoringRequestApplication', {
    RequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Semester: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SubjectGrade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    SendingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Result: {
        type: DataTypes.STRING,
    },
});

TutoringRequestApplication.belongsTo(Student, { foreignKey: 'StudentID' });
TutoringRequestApplication.belongsTo(Subject, { foreignKey: 'SubjectID' });
TutoringRequestApplication.belongsTo(Admin, { foreignKey: 'AdminID' });

module.exports = TutoringRequestApplication;
