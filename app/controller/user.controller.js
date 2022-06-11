var UserService = require('../services/user.service')


exports.logout = function(req, res){
    let userService = new UserService();
    userService.logout(req, res);
}



