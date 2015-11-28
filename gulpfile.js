'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');


// We need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon.
// Increase this delay if browser-sync won't reload for you.
var BROWSER_SYNC_RELOAD_DELAY = 500;
gulp.task('nodemon', function(cb) {
  var started = false;

  return nodemon({
      script: 'bin/www',
      ext: 'js jade json',
      watch: ['bin/www', 'app.js', 'routes/**/*', 'views/**/*']
    }).on('start', function() {
      // to avoid nodemon being started multiple times
      if (!started) {
        cb();
        started = true;
      }
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      reloadBrowser(BROWSER_SYNC_RELOAD_DELAY);
    });
});

function reloadBrowser(delay) {
  if (delay) {
    setTimeout(function reload() {
      browserSync.reload();
    }, delay);
  } else {
    browserSync.reload();
  }
}


gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 8080,
  });
});

gulp.task('lint', function() {
  return gulp.src(['./routes/*.js', './public/javascripts/*.js','./lib/*.js', './*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('serve', ['nodemon', 'browser-sync']);
gulp.task('default', ['serve']);
