const express = require("express");
const router = express.Router();

const userController = require("../controllers/Users");
const movieController = require("../controllers/Movie");
const ratingController = require("../controllers/Ratings");
const tagController = require("../controllers/Tags");
const getAllController = require('../controllers/GetAll');

router.post('/login', userController.loginUser);
router.post('/userregister', userController.userCreate);
router.get('/getusers', userController.getUsers);
router.put('/userupdate', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

router.post('/movieregister', movieController.movieCreate);
router.get('/getmovies', movieController.getMovies);
router.put('/movieupdate/:id', movieController.updateMovie);
router.put('/deletemovie/:id', movieController.deleteMovie);

router.post('/ratingregister', ratingController.ratingCreate);

router.post('/tagcreate', tagController.tagCreate);

router.get('/getallusermovierating', getAllController.getUserMovieRating);
router.get('/getallusermovietags', getAllController.getUserMovieTags);
router.get('/getallusermovieratingtags', getAllController.getUserMovieRatingTags);

module.exports = router;