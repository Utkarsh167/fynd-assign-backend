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


router.post('/create', verifyToken.verifyToken, movie_controller.addMovie);
router.put('/:id', verifyToken.verifyToken, movie_controller.updateMovie);
router.delete('/:id', verifyToken.verifyToken, movie_controller.removeMovie);
router.post('/list', verifyToken.verifyToken, movie_controller.listMovies);


module.exports = router;