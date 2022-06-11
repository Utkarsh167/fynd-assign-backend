const jwt = require('jsonwebtoken')
//const CONFIG = require('../config/constants')
//const Message = require('../config/messages')
//const User = require('./../models/Users')
const resFormat = require('../helper/responseFormat')
// var Token = require('../app/model/loginToken.model')
var jwtSecret= process.env.jwt_secret   
var User = require('../app/model/user.model')
exports.verifyToken =async (req, res, next) => {
  var token
  if ('authorization' in req.headers) {
    var token = req.headers.authorization.split(' ')[1];
  } 
  if (!token) {
    return res.status(401).send(resFormat.rError({auth: false, message:'token not present'}))
  } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log(err);
          return res.status(401).send(resFormat.rError({auth: false,message: 'Invalid Token'}))
        } else {
          console.log('token',token);
            User.findOne({ accessToken:token, isActive:true}, function(err, token) {
              if (err || !token) {
                return res.status(401).send(resFormat.rError({auth: false, message:'token not available'}))
              } else {
                req.headers.userId = token._id
                req.headers.userType = token.userType
                req.headers.tokenId = req.headers.authorization.split(' ')[1];
                next()
              }
            })
        }
    })
  }
}
