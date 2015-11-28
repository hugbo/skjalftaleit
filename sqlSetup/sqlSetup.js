'use strict';
var fs = require('fs');
var path = require('path');
require('dotenv').load();

var schema = path.join(__dirname, './earthquakeSchema.sql');
var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;


console.log('Dropping tables and re-creating...');

fs.readFile(schema, function (err, data) {
  if (err) {
    console.error('Error!', err);
    return;
  }

  sqlQuery(data.toString('utf8'), [], function (err) {
    if (err) {
      console.error('Error running script!', err);
      return;
    }

    console.log('Done!');
  });
});


function sqlQuery(q, values, cb) {
  pg.connect(DATABASE, function (error, client, done) {

    if (error) {
      console.error('Error running query', q, values, error);
      return cb(error);
    }

    client.query(q, values, function (err, result) {
      done();

      if (err) {
        console.error('Error running query', q, values, err);
        return cb(err);
      } else {
        return cb(null, result);
      }
    });
  });
};
