const RatingModel = require('../models/Ratings');
const MovieModel = require('../models/Movie');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ratingCreate = function (req, res) {
    const today = Date();
    const ratingData = {
        movie_id: req.body.movie_id,
        ratings: req.body.ratings,
        created_date: today
    };
    var token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            if (decoded) {
                ratingData.user_id = decoded.idusers;
                RatingModel.findOne({
                    where: {
                        [Op.and]: [{ user_id: decoded.idusers }, { movie_id: req.body.movie_id }]
                    }
                }).then(result => {
                    if (!result) {
                        if (Number(req.body.ratings) <= 10) {
                            RatingModel.create(ratingData).then(rateResult => {
                                res.json({ status: "Rating created successfully" });
                            }).catch(err => {
                                res.json('error ' + err);
                            })
                        } else {
                            res.json({ error: "Rating should be less than or equal to 10" });
                        }
                    } else {
                        res.json({ error: "Rating already entered by you. Can't enter again" });
                    }
                })
            }
        })
    }

}



module.exports = {
    ratingCreate
}