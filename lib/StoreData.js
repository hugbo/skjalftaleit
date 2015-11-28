'use strict'

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

var updateDB = module.exports;

updateDB.updateTablesUSGS = function(data) {
  console.log("Updating tables from USGS..");
  pg.connect(DATABASE, function(error, client, done) {
      var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
        ' VALUES($1, $2)';
      if (error) {
        return console.error('error fetching client from pool', error);
      }
      console.log("Inserting USGS data");
      for (var i = 1; i < data.length; i++) {
        var info = {};
        info["timestamp"] = new Date(data[i].properties.time);
        info["latitude"] = data[i].geometry.coordinates[1];
        info["longitude"] = data[i].geometry.coordinates[0];
        info["size"] = data[i].properties.mag;
        info["humanReadableLocation"] = data[i].properties.place;
        console.log(info);
        client.query(queryText, [info.timestamp, info], function(error, result) {
          done();
        });
      }
  });
}

updateDB.updateTablesAPIS = function(data) {
  console.log("Updating tables from APIS..");
  pg.connect(DATABASE, function(error, client, done) {
      var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
        ' VALUES($1, $2)';
      if (error) {
        return console.error('error fetching client from pool', error);
      }
      for (var i = 0; i < data.length; i++) {
        client.query(queryText, [data[i].timestamp, data[i]], function(error, result) {
          done();
        });
      }
  });
}


updateDB.getAllData = function(data, callback) {
  console.log("getAllData Initialized");
  pg.connect(DATABASE, function(err, client, done) {
    var queryString = 'SELECT results FROM earthquakes';
    if (err) {
      console.error('Error running query', queryString, data, err);
    }

    client.query(queryString, data, function(err, results) {
      done();

      if (err) {
        console.error('Error running query', queryString, data, err);
        return callback(err);
      } else {
        return callback(results);
      }
    });
  });

}
