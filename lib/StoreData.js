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
          console.error(error);
        }
        */
      });
    }
  });
}


updateDB.getAllData = function() {
  var results = [];

  pg.connect(DATABASE, function(error, client, done) {
      var queryText = 'SELECT results FROM earthquakes'
      if(error) {
        console.log(error);
      }
      var query = client.query(queryText);

      query.on('row',function(row) {
        results.push(row.results);
      });

      query.on('end', function() {
        done();
        console.log("Returning query...");
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
        return results;
      });

  });
}
