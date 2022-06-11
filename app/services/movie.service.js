var Movie = require('../model/movie.model')
const crypto = require('crypto');
var passport = require('passport')
var constants = require('../../common/constant')
var jwt = require('jsonwebtoken')
const { user } = require('../controller/user.controller');
const { resolveSoa } = require('dns');
const Genre = require('../model/genre.model');

class MovieService {

  async addMovie(req, res) {
    try {
      let movie = new Movie();
      movie.name = req.body.name;
      movie['99popularity'] = req.body['99popularity'];
      movie.director = req.body.director;
      movie.imdb_score = req.body.imdb_score;
      movie.genre = req.body.genre;
      if (req.body.other) {
        let genre = new Genre()
        genre.name = req.body.other;
        genre.type = 'custom';
        genre.addedBy = req.headers.userId;
        let genreCreated = await Genre.create(genre);
      }
      let movieCreated = await Movie.create(movie);
      if (movieCreated) res.send(true)
      else res.send(false)
    } catch (error) {
      return next(error);
    }
  }

  async removeMovie(req, res, next) {
    Movie.findOneAndDelete({ _id: req.params.id }, async (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
          status: 'success'
        });
      }
    });
  }

  async updateMovie(req, res, next) {
    let updateMovie = await Appointment.updateOne({ _id: req.params.id },
      {
        $set: {
          '99popularity': req.body['99popularity'], name: req.body.name,
          director: req.body.director, imdb_score: req.body.imdb_score, genre: req.body.genre
        }
      })
      if(updateMovie){
        if (req.body.other) {
          let genre = new Genre()
          genre.name = req.body.other;
          genre.type = 'custom';
          genre.addedBy = req.headers.userId;
          let genreCreated = await Genre.create(genre);
        }
        res.status(200).json({
          msg: data,
          status: 'success'
        });
      }else{
        res.status(200).json({
          msg: 'something went wrong',
          status: 'error'
        });      }
  }
}

module.exports = MovieService