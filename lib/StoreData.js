'use strict'

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

var updateDB = module.exports;

updateDB.updateTables = function(data) {
  pg.connect(DATABASE, function(error, client, done) {
    var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
      ' VALUES($1, $2)';
    if (error) {
      return console.error('error fetching client from pool', error);
    }
    for (var i = 0; i < data.length; i++) {
      client.query(queryText, [data[i].timestamp, data[i]], function(error, result) {
        done();
        /*
        if (error) {
          console.error("");
        }*/
      });
    }
  });
}


updateDB.getAllData = function() {
  pg.connect(DATABASE, function(error, client, done) {
      var queryText = 'SELECT results FROM earthquakes ORDER BY timestamp DESC'
      if (error) {
        return console.error('error fetching client from pool', error);
      }
      client.query(queryText,function(error, result) {
        done();
        if (error) {
          console.error('The following items already exists!');
        }
      });
  });
}
