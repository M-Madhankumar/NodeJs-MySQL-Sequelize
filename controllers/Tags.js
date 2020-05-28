const TagsModel = require('../models/Tags');
const MovieModel = require('../models/Movie');
const jwt = require("jsonwebtoken");

var tagCreate = function (req, res) {
    const tagData = {
        tags: req.body.tags,
        movie_id: req.body.movie_id
    }
    var token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            if (decoded) {
                tagData.user_id = decoded.idusers;
                MovieModel.findOne({
                    where: {
                        idmovie: req.body.movie_id
                    }
                }).then(movieRes => {
                    if (movieRes) {
                        TagsModel.create(tagData).then(tagResult => {
                            res.json({ status: "Tags created successfully for the Movie" })
                        }).catch(err => {
                            res.json('error ' + err);
                        })
                    } else {
                        res.json({ error: "Movie not found" })
                    }
                })
            }
        })
    }
}

module.exports = {
    tagCreate
}