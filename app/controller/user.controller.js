var UserService = require('../services/user.service')


exports.logout = function(req, res){
    let userService = new UserService();
    userService.logout(req, res);
}

exports.listMovies = function(req, res, next){
    let userService = new UserService();
    userService.listMovies(req, res, next);
}


