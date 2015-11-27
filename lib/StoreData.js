'use strict'

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

var updateDB = module.exports;

updateDB.updateTables = function(data) {
  console.log("Updating tables..");
  console.log(data);
  pg.connect(DATABASE, function(error, client, done) {
    var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
      ' VALUES($1, $2)';
    if (error) {
      return console.error('error fetching client from pool', error);
    }
    for (var i = 0; i < data.length; i++) {
      client.query(queryText, [data[i].timestamp, data[i]], function(error, result) {
        done();

        return console.log("Insertion finished");

        /*
        if (error) {
          console.error(error);
        }*/
      });
    }
  });
}


updateDB.getAllData = function(data, callback) {
  console.log("getAllData Initialized");
  pg.connect(DATABASE, function(err, client, done){
    var queryString = 'SELECT results FROM earthquakes';
    if(err){
      console.error('Error running query', queryString, data, err);
    }

    client.query(queryString, data, function(err, results){
      done();

      if(err){
        console.error('Error running query', queryString, data, err);
        return callback(err);
      }
      else {
        return callback(results);
      }
    });
  });

}
