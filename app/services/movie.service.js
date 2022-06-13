var Movie = require('../model/movie.model')
const crypto = require('crypto');
var passport = require('passport')
var constants = require('../../common/constant')
var jwt = require('jsonwebtoken')
const { user } = require('../controller/user.controller');
const { resolveSoa } = require('dns');
const Genre = require('../model/genre.model');
const CommonService = require('../../common/commonService')

class MovieService {

  async addMovie(req, res) {
    try {
      let movie = new Movie();
      movie.name = req.body.name;
      movie['99popularity'] = req.body['99popularity'];
      movie.director = req.body.director;
      movie.imdb_score = req.body.imdb_score;
      movie.genre = req.body.genre;
      if (req.body.isOther && req.body.other && req.body.other != '') {
        let genre = new Genre()
        genre.name = req.body.other;
        genre.type = 'custom';
        genre.addedBy = req.headers.userId;
        let genreCreated = await Genre.create(genre);
      }
      let movieCreated = await Movie.create(movie);
      if (movieCreated) {
        var commonService = new CommonService()
        await commonService.addActivityLogData('movieAdded',movieCreated._id,'create',req.headers.userId,'New movie added');
        res.send(true)
      }
      else { res.send(false) }
    } catch (error) {
      return next(error);
    }
  }

  async removeMovie(req, res, next) {
    Movie.findOneAndDelete({ _id: req.params.id }, async (error, data) => {
      if (error) {
        return next(error);
      } else {
        var commonService = new CommonService()
        await commonService.addActivityLogData('movieRemoved',data._id,'delete',req.headers.userId,'Movie deleted');
        res.status(200).json({
          msg: data,
          status: 'success'
        });
      }
    });
  }

  async getMovieDetails(req, res, next) {
    Movie.findOne({ _id: req.params.id }, async (error, data) => {
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
    let updateMovie = await Movie.updateOne({ _id: req.params.id },
      {
        $set: {
          '99popularity': req.body['99popularity'], name: req.body.name,
          director: req.body.director, imdb_score: req.body.imdb_score, genre: req.body.genre
        }
      })
    if (updateMovie) {
      if (req.body.isOther && req.body.other && req.body.other != '') {
        let genre = new Genre()
        genre.name = req.body.other;
        genre.type = 'custom';
        genre.addedBy = req.headers.userId;
        let genreCreated = await Genre.create(genre);
      }
      var commonService = new CommonService()
      await commonService.addActivityLogData('movieUpdated',updateMovie._id,'update',req.headers.userId,'Movie updated');
      res.status(200).json({
        // msg: data,
        status: 'success'
      });
    } else {
      res.status(200).json({
        msg: 'something went wrong',
        status: 'error'
      });
    }
  }

  async listMovies(req, res, next) {
    const limit = parseInt(req.body.limit);
    const pageNo = parseInt(req.body.page);
    const genre = req.body.genre;
    const sort = req.body.sort;


    try {
      const searchQuery = req.body.search;
      let aggPipe = [];

      let match2 = {};
      if (searchQuery != null && searchQuery != '') {
        match2["$text"] = { $search: searchQuery }
        aggPipe.push({ "$match": match2 });
      }

      let match1 = {};
      if (genre && genre.length > 0) {
        match1["$and"] = [
          { "genre": { $exists: true } },
          { "genre": { $elemMatch: { $in: genre } } },
        ];
        aggPipe.push({ "$match": match1 });
      }

      let sortOrder = {}
      if (sort && sort.sortBy && sort.sortOrder) {
        if (sort.sortBy === "name") {
          sortOrder = { "name": sort.sortOrder };
        } else if (sort.sortBy === "director") {
          sortOrder = { "director": sort.sortOrder };
        } else if (sort.sortBy === "99popularity") {
          sortOrder = { "99popularity": sort.sortOrder };
        }
        aggPipe.push({ "$sort": sortOrder });
      }

      // if(sort){
      // let sortBy = { sort.value.sort: sort.value.order };
      // aggPipe.push({ "$sort": sortBy });
      // }

      if (pageNo && limit) {
        let skip = (pageNo - 1) * limit;
        // aggPipe.push({ "$skip": skip });
        // aggPipe.push({ "$limit": limit });
        let facet = {
          "totalData": [
            // { "$match": { }},
            { "$skip": skip },
            { "$limit": limit }
          ],
          "totalCount": [
            { "$count": "count" }
          ]

        }
        aggPipe.push({ "$facet": facet });
      }

      const result = await Movie.aggregate(aggPipe);
      res.status(200).json({
        msg: result,
        status: 'success'
      });
    }
    catch (err) {
      throw new Error(err);
    }
    // Movie.find({ $text: { $search: "window" } }, async (error, data) => {
    //   if (error) {
    //     return next(error);
    //   } else {
    //     res.status(200).json({
    //       msg: data,
    //       status: 'success'
    //     });
    //   }
    // }).sort({ director: 1, '99popularity': -1, name: 1, });
  }

  async getGenres(req, res, next) {
    Genre.find({}, async (error, data) => {
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
}



module.exports = MovieService