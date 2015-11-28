/*jshint unused: false*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');


var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
// Command for allowing server to accesss /img folder and use content
app.use('/img', express.static(__dirname + '/img'));
  // Command for allowing server access to /public folder
app.use('/public', express.static(__dirname + '/public'));
// Command for allowing server access to /bower_components folder
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/', routes);

module.exports = app;
