const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
var cors = require('cors')
dotenv.config();
var path = require('path')
var pathToRegexp = require('path-to-regexp')
var user = require('./app/routes/user.routes')
var movie = require('./app/routes/movie.routes')
var passport = require('passport')
const database = require('./config/config.database')
require('./helper/passport')
var cookieParser = require('cookie-parser')
const compression = require('compression')
app.use(compression())
const createError = require('http-errors');

//initialing database
database.mongoose


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.text());
app.use(cookieParser())




app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});


// routes to handle requests
app.use('/user', user);
app.use('/movie', movie);


// 404 & to error handler
app.use((req, res, next) => {
    next(createError(404));
  });
  
  // Error Handler
  app.use(function (err, req, res, next) {
    console.error(err.message); // Log error message
    if (!err.statusCode) err.statusCode = 500; // If err ISR
    res.status(err.statusCode).send(err.message); // err msg send
  });

  
function except(path, fn) {
    var regexp = pathToRegexp(path)
    return function (req, res, next) {
        if (regexp.test(req.path)) return next()
        else return fn(req, res, next)
    }
}

module.exports = app