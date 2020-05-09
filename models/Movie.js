const Sequelize = require("sequelize");
const db = require("../util/db");

module.exports = db.sequelize.define(
    "movie",
    {
        idmovie: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        released_date: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
);