// Array with info of all quakes available
var quakeArray = [];
// Array of quakes to be displayed (within user set parameters)
var quakesToDisplay = [];


$(document).ready(function() {
  console.log("Stuff's good, frontscript active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getData(), 5000);
});

  // Receive data for earthquakes and parse it
  function getData(){
  $.ajax({
  'url': 'https://apis.is/earthquake/is',
  type: 'GET',
  contentType: 'application/json',
  dataType: 'JSON',
   success: function(response) {
    console.log(response);
    postData(response);
    // Feeds data from apis.is into array of quake objects
    var rawDataArray = response.results;
    console.log(rawDataArray);
    objectToQuakeArray(rawDataArray);
    console.log(quakeArray);
    createMarkers(quakeArray);
    createCircles(quakeArray);
    placeMarkers(markers);
    placeCircles(circles);
    console.log("Data parsed");
    }
  });
  }

  // Post earthquake data onto server
  function postData(quakeData) {
  $.ajax({
    url: '/data',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(quakeData),
    dataType: 'JSON'
    });
  }
