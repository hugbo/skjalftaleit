// Array with info of all quakes available
var quakeArray = [];
// Array of quakes to be displayed (within user set parameters)
var quakesToDisplay = [];

$(document).ready(function() {
  //console.log("Frontscript.js active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  getData();
  //Check for new data every 5 minutes
  setInterval(function() {
    getData();
  }, 60 * 5 * 1000);
});

/*
  Get all available earthquake data from the backend, and render
  the data on success
*/
function getData() {
  //console.log("getStripedData activated");
  $.ajax({
    url: '/data',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'JSON',
    success: function(response) {
      renderData(response);
    },
    error: function(err) {
      console.error("oh noes " + err);
    }
  });
}

/*
  This function initializes all the functions needed to render
  the markers, circles etc with the latest earthquake data.
*/
function renderData(response) {
  // Feeds data from the SQL database into an array of quake objects
  var rawDataArray = response.info;
  objectToQuakeArray(rawDataArray);
  evaluateQuakes(quakeArray);
  masterDisplayUpdate();

}
