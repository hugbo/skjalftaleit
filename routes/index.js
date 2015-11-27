var express = require('express');
var router = express.Router();
var request = require('request')
var updateDB = require('../lib/StoreData');

var d = new Date();
var startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 2);
var endDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate());
var minMagnitude= 0;
var maxMagnitude = 10;
setTimeout(getIcelandicQuakeData(), 5*60*1000);


/* GET and POST Home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'The Amateur Geologist Federation'
  });
});

router.post('/', function(req, res, next) {
  res.render('index', {
    title: 'The Amateur Geologist Federation'
  });
});

/* GET and POST About page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

router.post('/about', function(req, res, next) {
  res.render('about');
});

/* GET and POST Map page. */
router.get('/map', function(req, res, next) {
  res.render('map');
});

router.post('/map', function(req, res, next) {
  res.render('map');
});



router.get('/data', function(req, res) {
  updateDB.getAllData(null, function(data){
    var info = {'info': data.rows}
    res.send(info);
  });
});



/*
================================================================================
MIDDLEWARE
================================================================================
*/

function getWorldQuakeData(start, end, min, max){
  var originUrl = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  var startTime = '&starttime='+start;
  var endTime = '&endtime='+end;
  var minmagnitude = '&minmagnitude='+min;
  var maxmagnitude = '&maxmagnitude='+max;
  var fetchUrl = originUrl+startTime+endTime+minmagnitude+maxmagnitude;
  console.log(fetchUrl);
    request(fetchUrl, function(err, res, body){
      console.log("fetching..");
      console.log(body);
    });
}

function getIcelandicQuakeData(){
  var url = "http://apis.is/earthquake/is";
  request(url, function(err, res, body){
    console.log("Icelandic Data");
    var data = JSON.parse(body);
    updateDB.updateTables(data.results);
  });
}

module.exports = router;
