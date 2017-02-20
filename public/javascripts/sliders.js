'use strict';

/*jshint camelcase: false*/
/*global masterDisplayUpdate, moment, quakeArray, evaluateQuakes*/

var richterSliderData = {};
var timeSliderData = {};

$(document).ready(function() {
  $(function() {
    var sliderSize = $('#slider-size');
    // Range slider for user to choose which earthquakes to display
    // within set magnitude boundaries.
    sliderSize.ionRangeSlider({
      hide_min_max: true,
      keyboard: true,
      min: 0,
      max: 10,
      from: 0,
      to: 10,
      type: 'double',
      step: 0.25,
      grid: true,
      grid_num: 10,
      min_interval: 0.5,
      drag_interval: true,
      onFinish: function(data) {
        // Updates graphics objects on map when changed.
        richterSliderData = data;
        evaluateQuakes(quakeArray);
        masterDisplayUpdate();
        //console.log(data);
      },
      onStart: function(data) {
        // Data stored for initialization of map.
        richterSliderData = data;
        //console.log("Magnitude slider data moved");
      }

    });


    var sliderTime = $('#slider-time');
    // Range slider for user to choose which earthquakes to display
    // that fall within time constraints.
    sliderTime.ionRangeSlider({
      hide_min_max: true,
      keyboard: true,
      min: +moment().format('X')-604800, //The oldest earthquake happened on Nov. 21 (unix format)
      max: +moment().format('X'), // Current time (unix)
      from: +moment().format('X')-604800,
      to: +moment().format('X'),
      type: 'double',
      grid: true,
      grid_num: 6,
      drag_interval: true,
      force_edges: true,
      prettify: function(num) {
        // Translate unix time to standard format
        var m = moment(num, 'X').locale('is');
        return m.format('Do MMMM, HH:mm');
      },
      onFinish: function(data) {
        // Updates graphics objects on map when changed.
        timeSliderData = data;
        evaluateQuakes(quakeArray);
        masterDisplayUpdate();
        //console.log(data);
      },
      onStart: function(data) {
        // Data stored for initialization of map.
        timeSliderData = data;
        //console.log("Time slider data moved");
      }
    });

    // Event listeners to display certain types of graphical objects
    // on map when checkboxes are checked.
    $('#markerCheckbox').click(function() {
      masterDisplayUpdate();
    });

    $('#circleCheckbox').click(function() {
      masterDisplayUpdate();
    });

    $('#heatCheckbox').click(function() {
      masterDisplayUpdate();
    });

  });
});
