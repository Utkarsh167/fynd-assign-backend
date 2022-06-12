var app = require('./index')
var debug = require('debug')('Baker:server')
const http = require('http')
// var port = normalizePort(process.env.PORT || '443') 
var httpport = process.env.HTTPPORT || '80'
const https = require('https')

var express = require('express')
const CommonService = require('./common/commonService')

// for http uncomment this code and comment above server
// const httpserver = http.createServer(app).listen(httpport, () => {
//   console.log('http server running at ' + httpport)
// })

var httpsOptions = {
 
}   
var server = https.createServer(httpsOptions, app).listen(443, function () {
  console.log("Express server listening on port " + 443);
});


// http.createServer(function (req, res) {
//   res.writeHead(301, {
//     "Location": "https://" + req.headers['host'] + req.url
//   });
//   res.end();
// }).listen(80)

// Check if any user exist, if not then add admin
var commonService = new CommonService()
commonService.checkAndAddAdmin();
