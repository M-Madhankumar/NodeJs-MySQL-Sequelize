var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const MovieModel = require('../models/Movie');


var movieCreate = function (req, res) {
    var movieData = {
        name: req.body.name,
        genre: req.body.genre,
        released_date: req.body.released_date,
        description: req.body.description
    }
    MovieModel.findOne({
        where: {
            name: req.body.name
        }
    }).then(result => {
        if (!result) {
            MovieModel.create(movieData).then(movieResult => {
                res.json({ status: "Movie Created Successfully" });
            })
        } else {
            res.json({ status: "Movie already exists" })
        }
    }).catch(err => {
        res.json('error ' + err);
    })

}

var getMovies = function (req, res) {
    MovieModel.findAll({}).then(result => {
        res.json({ result })
    }).catch(err => {
        res.json('error ' + err);
    })
}

var updateMovie = function (req, res) {
    var movieId = req.params.id;
    MovieModel.findOne({
        where: {
            idmovie: movieId
        }
    }).then(result => {
        if (result) {
            const movieDate = {
                name: req.body.name ? req.body.name : result.name,
                genre: req.body.genre ? req.body.genre : result.genre,
                released_date: req.body.released_date ? req.body.released_date : result.released_date,
                description: req.body.description ? req.body.description : result.description
            };
            MovieModel.update(movieDate, {
                where: {
                    idmovie: movieId
                }
            }).then(resp => {
                res.json({ status: "Update Successfully" })
            }).catch(err => {
                res.json('error' + err);
            })
        } else {
            res.json({ status: 'Moive not found' })
        }
    }).catch(err => {
        res.json('error' + err)
    })
}

var deleteMovie = function (req, res) {
    var movieId = req.params.id;
    UserModel.destroy({
        where: {
            idmovie: movieId
        }
    }).then(resp => {
        res.json({ status: 'Movie deleted successfully' });
    }).catch(err => {
        res.json('error' + err);
    })
}

module.exports = {
    movieCreate, getMovies, updateMovie, deleteMovie
}