'use strict';
/*jshint unused: false*/
/*jshint loopfunc: true */

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

var updateDB = module.exports;

/*
  Here we're updating the SQL database with data from
  USGS. Note that the timestamp is the PrimaryKey so no
  duplicates will be inserted
*/
updateDB.updateTablesUSGS = function(data) {
  console.log('Updating tables from USGS..');
  pg.connect(DATABASE, function(error, client, done) {
    var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
      ' VALUES($1, $2)';
    if (error) {
      return console.error('error fetching client from pool', error);
    }
    console.log('Inserting USGS data');
    for (var i = 0; i < data.length; i++) {
      /*
        Seeing that the USGS data is a lot more than we need, we must
        first get all the relevant information we need from the quakeArray.
        The relevant info is put into a new object called info
      */
      var timestamp = new Date(data[i].properties.time);
      var latitude = data[i].geometry.coordinates[1];
      var longitude = data[i].geometry.coordinates[0];
      var size = data[i].properties.mag;
      var humanReadableLocation = data[i].properties.place;
      var dataSource = 'USGS';

      var info = {
        timestamp: timestamp,
        latitude: latitude,
        longitude: longitude,
        size: size,
        humanReadableLocation: humanReadableLocation,
        dataSource: dataSource
      };
      //Inserting each quake into the SQL database
      client.query(queryText, [info.timestamp, info], function(error, result) {
        done();
      });
    }
  });
};

/*
  Here we're updating the SQL database with data from
  apis.is . Note that the timestamp is the PrimaryKey so no
  duplicates will be inserted
*/
updateDB.updateTablesAPIS = function(data) {
  console.log('Updating tables from APIS..');
  pg.connect(DATABASE, function(error, client, done) {
    var queryText = 'INSERT INTO earthquakes(timestamp, results)' +
      ' VALUES($1, $2)';
    if (error) {
      return console.error('error fetching client from pool', error);
    }
    //Inserting each quake into the SQL database
    for (var i = 0; i < data.length; i++) {
      data[i].dataSource = 'APIS';
      client.query(queryText, [data[i].timestamp, data[i]],
        function(error, result) {
        done();
      });
    }
  });
};


/*
  This function gets all available quakeData from the SQL database.
*/
updateDB.getAllData = function(data, callback) {
  console.log('getAllData Initialized');
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

};
