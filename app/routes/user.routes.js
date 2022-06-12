const express = require('express');
const user_controller = require('../controller/user.controller');
expressValidator = require('express-validator');
const router = express.Router();
const resMessage = require('../../helper/responseMessages')
const resFormat = require('../../helper/responseFormat')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var accessTokenSecret = process.env.jwt_secret
var verifyToken = require('../../helper/authMiddleware')
var User = require('../../app/model/user.model')

router.use(expressValidator());

function signIn(req, res) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      let result = { "message": err };
      res.status(404).send(resFormat.rError(result));
    } else if (info && info.message == "User is not Active") {
      let message = resMessage.data(609, [{ key: '{support_email}', val: process.env.sesfromEmail }])
      let result = { "message": message, "invalidEmail": true, "invalidPassword": false }
      res.status(200).send(resFormat.rError(result))
    } else if (info && info.message == "Password is wrong") {
      let message = resMessage.data(614, [{ key: '{field}', val: 'password' }])
      let result = { "message": message, "invalidEmail": false, "invalidPassword": true }
      res.status(200).send(resFormat.rError(result))
    } else if (info && info.message == "User not found") {
      let message = resMessage.data(606, []) // change by subodh on 7-1-20. Old value 615
      let result = { "message": message, "invalidEmail": true, "invalidPassword": false }
      res.status(200).send(resFormat.rError(result))
    } else if (info && info.message == "Account Not Verified") {
      let message = resMessage.data(613, [])
      let result = { "message": message, "accountNotVerified": true, "invalidPassword": false }
      res.status(200).send(resFormat.rError(result))
    } else if (info && info.message == "Account Not approved") {
      let message = resMessage.data(613, [])
      let result = { "message": message, "accountNotApproved": true, "invalidPassword": false }
      res.status(200).send(resFormat.rError(result))
    }
    else if (info && info.message == "WrongMethod") {
      let message = resMessage.data(707, []) // change by subodh on 7-1-20. Old value 615
      let result = { "message": message, "otherAccount": true, "invalidPassword": false }
      res.status(200).send(resFormat.rError(result))
    }
    else if (user) {

      if (user.isActive) {
        const token = jwt.sign({ userId: user._id, userType: user.userType }, accessTokenSecret);
        User.updateOne({ _id: user._id }, { $push: { accessToken: token } }, async function (err, updateRes) {
          if (updateRes && !err) {
            let userObj;
            userObj = {
              accessToken: token,
              userId: user._id,
              email: user.email.toLowerCase(),
              userType: user.userType,
              firstName: user.firstName,
              lastName: user.lastName,
            }
            res.send(resFormat.rSuccess(userObj))
          } else {
            res.send(resFormat.rError({ message: "Invalid email" }))
          }
        })
      }
      else {
        res.send(resFormat.rError({ "userNotActive": true }))
      }
    } else {
      res.send(resFormat.rError({ message: "Please enter correct password." }))
    }
  })(req, res)
}

router.post("/signin", signIn)
router.post('/logout', verifyToken.verifyToken, user_controller.logout);
router.post('/list', verifyToken.verifyToken, user_controller.listMovies);


module.exports = router;