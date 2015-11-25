var express = require('express');
var app = express();
var router = express.Router();
var updateDB = require('../lib/StoreData');

/* GET and POST Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Amateur Geologist Federation' });
});

router.post('/', function(req, res, next) {
  res.render('index', {title: 'The Amateur Geologist Federation' });
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
  res.render('index', {title: 'The Amateur Geologist Federation' });
});

router.post('/data', function(req, res){
  var dataArray = req.body.results;
  updateDB.updateTables(dataArray);
  updateDB.getAllData();
  res.redirect('/');
});


module.exports = router;
