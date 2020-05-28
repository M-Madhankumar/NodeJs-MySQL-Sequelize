const Sequelize = require("sequelize");
const db = require("../util/db");

module.exports = db.sequelize.define(
    "ratings",
    {
        idratings: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ratings: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "idusers"
            }
        },
        movie_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "movie",
                key: "idmovie"
            }
        },
        created_date: {
            type: Sequelize.DATE
        },
        updated_date: {
            type: Sequelize.DATE
        }
    },
    {
        timestamps: false
    }
);