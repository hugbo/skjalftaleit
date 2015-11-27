// Object containing all data on earthquakes straight from database
var masterData = {};
// Array with info of all quakes available
var quakeArray = [];
// Array of quakes to be displayed (within user set parameters)
var quakesToDisplay = [];
// Current date, created when webpage is run
var d = new Date();
var tmpData = {};

$(document).ready(function() {
  console.log("Frontscript.js active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getStripedData(),5000);
});

function getStripedData() {
  console.log("getStripedData activated");
  $.ajax({
    url: '/data',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'JSON',
    success: function(response) {
      console.log("Virkar!!!!");
      console.log(response);
      egillAdFikta(response);
    },
    error: function(err) {
      console.error("oh noes " + err);
    }
  });
}

/*
  Notkun: egillAdFikta(response);
  Fyrir: Egill þarf að vera í stuði til þess að fikta
  Eftir:  Egill er búinn að fikta ( ͡° ͜ʖ ͡°)
*/
function egillAdFikta(response) {
  // Feeds data from apis.is into array of quake objects
  var rawDataArray = response.info;
  //console.log("Rawdata is", rawDataArray);
  // Hard set graphical objects
  /*
  objectToQuakeArray(rawDataArray);
  console.log(quakeArray);
  createMarkers(quakeArray);
  console.log(markers);
  setMarkerInfo(markers);
  createCircles(quakeArray);
  //createHeatmapPoints(quakeArray);
  placeMarkers(markers);
  placeCircles(circles);
  */
  console.log("Rawdata is", rawDataArray);
  objectToQuakeArray(rawDataArray);
  evaluateQuakes(quakeArray);
  masterDisplayUpdate();

  //placeHeatmapPoints(heatmapping);
  console.log("Data parsed");
}
