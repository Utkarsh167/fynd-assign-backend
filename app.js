var app = require('./index')
var debug = require('debug')('Baker:server')
const http = require('http')
// var port = normalizePort(process.env.PORT || '443') 
var port = process.env.PORT || 3000

var express = require('express')
const CommonService = require('./common/commonService')

// for http uncomment this code and comment above server
// const httpserver = http.createServer(app).listen(httpport, () => {
//   console.log('http server running at ' + port)
// })

app.listen(port, err => {
  if(err) throw err;
  console.log("%c Server running", "color: green");
});
// Check if any user exist, if not then add admin
var commonService = new CommonService()
commonService.checkAndAddAdmin();
