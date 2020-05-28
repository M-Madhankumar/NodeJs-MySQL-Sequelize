const Sequelize = require("sequelize");
const db = require("../util/db");

module.exports = db.sequelize.define(
    "tags",
    {
        idtags: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tags: {
            type: Sequelize.STRING
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
        }
    },
    {
        timestamps: false
    }
);