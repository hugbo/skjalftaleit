'use strict';
/*global
  google, quakesToDisplay, timeSliderData, richterSliderData,
  quakeArray
*/
/*exported
  initMap, masterDisplayUpdate, evaluateQuakes, objectToQuakeArray
*/
/* jshint -W079 */

// Variable for google map instance
var map;
// Variables for graphical objects to be placed on map
var markers = [];
var circles = [];
var heatmapping = {};
// Variable for storing current info window that is open
var currentInfoWindow = {};
// Variable for storing quakes to be displayed on map
var quakesToDisplay = [];


// Function for initializing map
function initMap() {
  //console.log('Map Initialized');
  map = new google.maps.Map(document.getElementById('map'), {
    // Initialized with focus on Reykjavik coordinates
    center: {
      lat: 64.133,
      lng: -21.933
    },
    zoom: 5
  });
}

// Master function for displaying appropriate graphical objects on map
function masterDisplayUpdate() {
  // Remove current graphics and then reapply new graphics
  removeAllGraphics();
  if ($('#markerCheckbox').is(':checked')) {
    createMarkers(quakesToDisplay);
    placeMarkers(markers);
  }
  if ($('#circleCheckbox').is(':checked')) {
    createCircles(quakesToDisplay);
    placeCircles(circles);
  }
  if ($('#heatCheckbox').is(':checked')) {
    createHeatmapPoints(quakesToDisplay);
    placeHeatmapPoints(heatmapping);
  }
  //console.log("Master display complete")
}

// Function for removing all graphical objects from the map.
function removeAllGraphics() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  // First all markers removed from map and then deleted. Easily possible
  // to reattain markers by using quakeArray and createMarkers
  markers = [];
  for (var o = 0; o < circles.length; o++) {
    circles[o].setMap(null);
  }
  // Heatmap is all in one object, no need for loop.
  if (heatmapping.map !== undefined) {
    heatmapping.setMap(null);
  }
}

// Function for evaluating which quakes should be displayed
// based on user parameters.
function evaluateQuakes(arrayOfQuakes) {
  var tmpQuakeArray = [];
  for (var i = 0; i < arrayOfQuakes.length; i++) {
    // Time divided by 1000 to receive time in seconds, not milliseconds
    var quaketime = arrayOfQuakes[i].time / 1000;
    if (checkWithinBounds(quaketime, timeSliderData.from, timeSliderData.to) &&
      checkWithinBounds(arrayOfQuakes[i].strength, richterSliderData.from,
        richterSliderData.to)) {
      tmpQuakeArray.push(arrayOfQuakes[i]);
      //console.log('Quake to display added');
    }
  }
  /* global quakesToDisplay:true*/
  quakesToDisplay = tmpQuakeArray;
}

// Function to see if value falls within bounds.
function checkWithinBounds(argument, minValue, maxValue) {
  if ((minValue < argument) && (argument < maxValue)) {
    return true;
  }
  return false;
}

// Function for creating array of quake objects with data
// array from JSON object. Stores them in global variable named
// quakearray as an array in file frontjavascript.js
function objectToQuakeArray(rawDataArray) {
  //console.log(rawDataArray);
  for (var i = 0; i < rawDataArray.length; i++) {
    var latitude = rawDataArray[i].results.latitude;
    var longitude = rawDataArray[i].results.longitude;
    var strength = rawDataArray[i].results.size;
    var timestamp = new Date(rawDataArray[i].results.timestamp);
    var location = rawDataArray[i].results.humanReadableLocation;
    var dataSource = rawDataArray[i].results.dataSource;
    var tmpQuake = new quake(latitude, longitude, strength, timestamp,
      location, dataSource);
    quakeArray.push(tmpQuake);
  }
  //console.log("Quakes have been added");
}

// Function for creating markers and placing in array
function createMarkers(arrayOfQuakes) {
  var tmpArray = [];
  for (var i = 0; i < arrayOfQuakes.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: arrayOfQuakes[i].lat,
        lng: arrayOfQuakes[i].lng
      },
      title: 'marker number ' + i
    });
    // Inserts corresponding quake object into marker itself
    marker.quake = arrayOfQuakes[i];
    tmpArray.push(marker);
    //console.log("Marker created");
  }
  markers = tmpArray;
  // Attaches info windows to markers
  setMarkerInfo(markers);
}

// Function for placing marker on map with given data
function placeMarkers(arrayOfMarkers) {
  for (var i = 0; i < arrayOfMarkers.length; i++) {
    arrayOfMarkers[i].setMap(map);
    //console.log("Marker placed");
  }
}

// Function for attaching info windows to markers
function setMarkerInfo(markerArray) {
  for (var i = 0; i < markerArray.length; i++) {
    // Content for info box
    var contentString = '<div class="markerContent">' +
      '<p>' +
      'Latitude: ' + markerArray[i].quake.lat + '<br/>' +
      'Longitude: ' + markerArray[i].quake.lng + '<br/>' +
      'Magnitude: ' + markerArray[i].quake.strength + '<br/>' +
      'Date: ' + dayFromDateObject(markerArray[i].quake.time) + '<br/>' +
      'Time: ' + timeFromDateObject(markerArray[i].quake.time) + '<br/>' +
      'Location: ' + markerArray[i].quake.readableLocation + '<br/>' +
      'Data Source: ' + markerArray[i].quake.dataSource +
      '</p>' +
      '</div>';

    // Info window constructor
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    markerArray[i].infowindow = infowindow;
    attachMarkerListeners(i);
  }
}

// Function for adding event listeners to markers so they display
// info windows when clicked.
function attachMarkerListeners(i) {
  google.maps.event.addListener(markers[i], 'click', function() {
    if (currentInfoWindow.content !== undefined) {
      currentInfoWindow.close();
    }
    this.infowindow.open(map, this);
    currentInfoWindow = this.infowindow;
  });
}

// Function for creating circular graphics objects for the map.
function createCircles(arrayOfQuakes) {
  var tmpArray = [];
  for (var i = 0; i < arrayOfQuakes.length; i++) {
    // Sets opacity with respect to Richter magnitude.
    // Stronger quakes result in less transparent circles.
    var opacity = arrayOfQuakes[i].strength / 10.0;
    if (opacity > 1.0) {
      opacity = 1.0;
    }
    // Constructor for circles.
    var circle = new google.maps.Circle({
      strokeColor: '#FF7700',
      strokeOpacity: opacity,
      strokeWeight: 2,
      fillColor: '#FF7700',
      fillOpacity: opacity,
      map: map,
      center: {
        lat: arrayOfQuakes[i].lat,
        lng: arrayOfQuakes[i].lng
      },
      radius: arrayOfQuakes[i].strength * 10000
    });
    tmpArray.push(circle);
    //console.log("Circle created");
  }
  circles = tmpArray;
  attachCircleListeners(circles); //
}

function setCircleInfo(markerArray) { //
  for (var i = 0; i < markerArray.length; i++) {
    // Content for info box
    var contentString = '<div class="markerContent">' +
      '<p>' +
      'Latitude: ' + markerArray[i].quake.lat + '<br/>' +
      'Longitude: ' + markerArray[i].quake.lng + '<br/>' +
      'Magnitude: ' + markerArray[i].quake.strength + '<br/>' +
      'Date: ' + dayFromDateObject(markerArray[i].quake.time) + '<br/>' +
      'Time: ' + timeFromDateObject(markerArray[i].quake.time) + '<br/>' +
      'Location: ' + markerArray[i].quake.readableLocation + '<br/>' +
      'Data Source: ' + markerArray[i].quake.dataSource +
      '</p>' +
      '</div>';

    // Info window constructor
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    markerArray[i].infowindow = infowindow;
    attachCircleListeners(i);
  }
}

function attachCircleListeners(i) {
  google.maps.event.addListener(circles[i], 'click', function() {
    if (currentInfoWindow.content !== undefined) {
      currentInfoWindow.close();
    }
    this.infowindow.setPosition(circles[i].latLng);
    this.infoWindow.open(map);
    currentInfoWindow = this.infowindow;
  });
}

// Function for placing circle on map with given data
function placeCircles(arrayOfCircles) {
  for (var i = 0; i < arrayOfCircles.length; i++) {
    circles[i].setMap(map);
    //console.log("Circle placed");
  }
}

// Function for creating heatmap points
function createHeatmapPoints(arrayOfQuakes) {
  var heatmapData = [];
  for (var i = 0; i < arrayOfQuakes.length; i++) {
    // LatLng object with coordinates of earthquake.
    var latLng = new google.maps.LatLng(arrayOfQuakes[i].lat,
       arrayOfQuakes[i].lng);
      // Size and weight of heatpoint increase with earthquake magnitude.
    var tmpWeight = arrayOfQuakes[i].strength / 15;
    var weightedLocation = {
      location: latLng,
      weight: tmpWeight,
      radius: 1
    };
    heatmapData.push(weightedLocation);
  }
  // Takes all weighted points and places them on single heatmap layer
  var heatmapPoints = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
  });
  heatmapping = heatmapPoints;
}

// Function for placing heatmap data on map
function placeHeatmapPoints(heatmapInput) {
  heatmapInput.setMap(map);
}

// Function for creating object containing quake data
function quake(latitude, longitude, richter, timestamp, location, dataOrigin) {
  /* jshint validthis:true */
  this.lat = latitude;
  /* jshint validthis:true */
  this.lng = longitude;
  /* jshint validthis:true */
  this.strength = richter;
  /* jshint validthis:true */
  this.time = timestamp;
  /* jshint validthis:true */
  this.readableLocation = location;
  /* jshint validthis:true */
  this.dataSource = dataOrigin;
}

// Function for parsing Date object into custom string containing the day
// in format YYYY/MM/DD
function dayFromDateObject(dateObject) {
  var stringToReturn = dateObject.getFullYear() + '/' +
    dateObject.getMonth() + '/' +
    dateObject.getDate();
  return stringToReturn;
}

// Function for parsing Date object into custom string containing time
// in format HH:MM:SS
function timeFromDateObject(dateObject) {
  var stringToReturn = dateObject.getHours() + ':' +
    dateObject.getMinutes() + ':' +
    dateObject.getSeconds();
  return stringToReturn;
}
