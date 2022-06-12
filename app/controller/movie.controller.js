var MovieService = require('../services/movie.service')


exports.addMovie = function(req, res, next){
    let movieService = new MovieService();
    movieService.addMovie(req, res, next);
}

exports.updateMovie = function(req, res, next){
    let movieService = new MovieService();
    movieService.updateMovie(req, res, next);
}

exports.removeMovie = function(req, res, next){
    let movieService = new MovieService();
    movieService.removeMovie(req, res, next);
}

exports.listMovies = function(req, res, next){
    let movieService = new MovieService();
    movieService.listMovies(req, res, next);
}

exports.getGenres = function(req, res, next){
    let movieService = new MovieService();
    movieService.getGenres(req, res, next);
}
exports.getMovieDetails = function(req, res, next){
    let movieService = new MovieService();
    movieService.getMovieDetails(req, res, next);
}


