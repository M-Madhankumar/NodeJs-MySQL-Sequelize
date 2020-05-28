const UserModel = require('../models/Users');
const MovieModel = require('../models/Movie');
const RatingModel = require('../models/Ratings');
const TagModel = require('../models/Tags');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

UserModel.hasMany(TagModel, { foreignKey: 'user_id' });
TagModel.belongsTo(UserModel, { foreignKey: 'user_id', targetKey: 'idusers' });

MovieModel.hasMany(TagModel, { foreignKey: 'movie_id' });
TagModel.belongsTo(MovieModel, { foreignKey: 'movie_id', targetKey: 'idmovie' });

UserModel.hasMany(RatingModel, { foreignKey: 'user_id' });
RatingModel.belongsTo(UserModel, { foreignKey: 'user_id', targetKey: 'idusers' });

MovieModel.hasMany(RatingModel, { foreignKey: 'movie_id' });
RatingModel.belongsTo(MovieModel, { foreignKey: 'movie_id', targetKey: 'idmovie' });


const getUserMovieRating = function (req, res) {
    RatingModel.findAll({
        include: [
            {
                model: UserModel
            },
            {
                model: MovieModel
            }
        ]
    }).then(result => {
        res.json({ status: result })
    }).catch(err => {
        res.json('error ' + err);
    })
};

var getUserMovieTags = function (req, res) {
    TagModel.findAll({
        include: [
            {
                model: UserModel
            },
            {
                model: MovieModel
            }
        ]
    }).then(result => {
        res.json({ status: result })
    }).catch(err => {
        res.json('error ' + err);
    })
};

var getUserMovieRatingTags = function (req, res) {
    // MovieModel.findAll({
    //     include: [
    //         {
    //             model: RatingModel,
    //             include: [
    //                 {
    //                     model: UserModel
    //                 }
    //             ]
    //         },
    //         {
    //             model: TagModel
    //         }
    //     ]
    MovieModel.findAll({
        include: [
            {
                model: RatingModel,
                include: [
                    {
                        model: UserModel
                    }
                ]
            },
            {
                model: TagModel,
                include: [
                    {
                        model: UserModel
                    }
                ]
            }
        ]
    }).then(result => {
        res.json({ status: result })
    }).catch(err => {
        res.json("error" + err)
    })
}

module.exports = {
    getUserMovieRating, getUserMovieTags, getUserMovieRatingTags
}