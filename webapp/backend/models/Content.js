const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb");
const Tutor = require("./Tutor");

const Content = sequelize.define('Content', {
    ContentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ContentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
    },
    Keyword: {
        type: DataTypes.STRING,
    },
    UploadDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

Content.belongsTo(Tutor, { foreignKey: 'TutorID' });

module.exports = Content;
