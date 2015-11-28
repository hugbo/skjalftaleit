'use strict';

var express = require('express');
var router = express.Router();
var request = require('request'); //request module used for easy get requests.
var updateDB = require('../lib/StoreData'); //connection to StoreData.js

/*
  Variables for the USGS request function
*/
var d = new Date();

var startDate = d.getFullYear() + '-' + (d.getMonth() + 1)+
'-' + (d.getDate() - 2);

var endDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate());
var minMagnitude = 0;
var maxMagnitude = 10;

//Get data from apis.is every 5 minutes
setInterval(function() {
  getIcelandicQuakeData();
}, 5 * 60 * 1000);

//Get data from USGS every 10 minutes
setInterval(function() {
  getWorldQuakeData(startDate, endDate, minMagnitude, maxMagnitude);
}, 10 * 60 * 1000);


/* GET Home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET /data page for AJAX frontend requests. */
router.get('/data', function(req, res) {
  updateDB.getAllData(null, function(data) {
    var info = {
      'info': data.rows
    };
    res.send(info);
  });
});


/*
================================================================================
FUNCTIONS / MIDDLEWARE
================================================================================
*/

/*
  Get request function for USGS - this function gets
  specific earthquake activity for a desired timeframe (and magnitude range)
  from The United States Geological Survey and inserts them into our SQL
  database
*/
function getWorldQuakeData(start, end, min, max) {
  var url = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  var startTime = '&starttime=' + start;
  var endTime = '&endtime=' + end;
  var minmagnitude = '&minmagnitude=' + min;
  var maxmagnitude = '&maxmagnitude=' + max;
  var fetchUrl = url + startTime + endTime + minmagnitude + maxmagnitude;
  console.log(fetchUrl);
  request(fetchUrl, function(err, res, body) {
    console.log('fetching World data..');
    var data = JSON.parse(body);
    updateDB.updateTablesUSGS(data.features);
  });
}


/*
  Get request function for apis.is - this function gets earthquake activity
  from the Icelandic Meteorological Office for the last two days and inserts
  them into our SQL database
*/
function getIcelandicQuakeData() {
  var url = 'http://apis.is/earthquake/is';
  request(url, function(err, res, body) {
    console.log('Icelandic Data');
    var data = JSON.parse(body);
    updateDB.updateTablesAPIS(data.results);
  });
}

module.exports = router;
