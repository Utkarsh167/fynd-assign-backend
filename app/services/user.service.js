var User = require('../model/user.model')
const crypto = require('crypto');
var passport = require('passport')
var constants = require('../../common/constant')
var jwt = require('jsonwebtoken')
const { user } = require('../controller/user.controller');
const { resolveSoa } = require('dns');

class UserService {

  async logout(req, res) {
    await User.updateMany({}, { $pull: { accessToken: req.headers.tokenId } }, { multi: true })
    res.send(true)
  }
}

module.exports = UserService