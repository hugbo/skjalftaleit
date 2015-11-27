// Array with info of all quakes available
var quakeArray = [];
// Array of quakes to be displayed (within user set parameters)
var quakesToDisplay = [];
// Current date, created when webpage is run
var d = new Date();
var startTime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-2);
var endTime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate());
var minmagnitude = 0;
var maxmagnitude = 10;

var tmpData = {};

$(document).ready(function() {
  console.log("Stuff's good, frontscript active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getData(startTime, endTime, minmagnitude, maxmagnitude), 5000);
  getStripedData();
});

  // Receive data for earthquakes and parse it
  function getData(startTime, endTime, minmagnitude, maxmagnitude){
  console.log("Getting data...");
  //Sækja gögn af Apis.is
  $.ajax({
  'url': 'https://apis.is/earthquake/is',
  type: 'GET',
  contentType: 'application/json',
  dataType: 'JSON',
   success: function(response) {
    //console.log(response);
    postData(response);
    //egillAdFikta(response);
    }
  });


  /*
  //Sækja gögn af USGS
  $.ajax({
    'url': 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime='
    +startTime+'&endtime='+endTime+'&minmagnitude='+minmagnitude+'&maxmagnitude='
    +maxmagnitude,
    type: 'GET',
    contentType: 'application/jsonp',
    dataType: 'JSONP',
    success: function(response) {
      console.log(response);
    },
    error: function() {
      console.log("USGS no work man :()");
    }
  });
  */
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

  function getStripedData(){
    console.log("getStripedData activated");
    $.ajax({
      url: '/data',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'JSON',
      success: function(response){
        console.log("Virkar!!!!");
        console.log(response);
        egillAdFikta(response);
      },
      error: function(err){
        console.error("oh noes "+err);
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
  console.log("Rawdata is", rawDataArray);
  objectToQuakeArray(rawDataArray);
  console.log(quakeArray);
  createMarkers(quakeArray);
  console.log(markers);
  setMarkerInfo(markers);
  createCircles(quakeArray);
  //createHeatmapPoints(quakeArray);
  placeMarkers(markers);
  placeCircles(circles);

  //placeHeatmapPoints(heatmapping);
  console.log("Data parsed");
}
