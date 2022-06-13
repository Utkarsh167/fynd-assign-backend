const express = require('express');
const movie_controller = require('../controller/movie.controller');
expressValidator = require('express-validator');
const router = express.Router();
const resMessage = require('../../helper/responseMessages')
const resFormat = require('../../helper/responseFormat')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var accessTokenSecret = process.env.jwt_secret
var verifyToken = require('../../helper/authMiddleware')
var User = require('../model/user.model')

router.use(expressValidator());

// add new movie
router.post('/create', verifyToken.verifyToken, movie_controller.addMovie);
// update movie
router.put('/:id', verifyToken.verifyToken, movie_controller.updateMovie);
// remove movie
router.delete('/:id', verifyToken.verifyToken, movie_controller.removeMovie);
// list movie with filter
router.post('/list', movie_controller.listMovies);
// get genres
router.get('/genres', movie_controller.getGenres);
// get movie details by id
router.get('/:id', movie_controller.getMovieDetails);


module.exports = router;