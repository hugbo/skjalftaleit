var quakeArray = [];

$(document).ready(function() {
  console.log("Stuff's good, frontscript active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getData(), 5000);
});

  // Receive data for earthquakes and parse it
  function getData(){
  $.ajax({
  'url': 'http://apis.is/earthquake/is',
  type: 'GET',
  contentType: 'application/json',
  dataType: 'JSON',
   success: function(response) {
    console.log(response);
    postData(response);
    // Feeds data from apis.is into array of quake objects
    var rawDataArray = response.results;
    console.log(rawDataArray);
    for(var i = 0; i < rawDataArray.length; i++) {
      var latitude = rawDataArray[i].latitude;
      var longitude = rawDataArray[i].longitude;
      var strength = rawDataArray[i].size;
      var timestamp = rawDataArray.timestamp;
      var tmpQuake = new quake(latitude, longitude, strength, timestamp)
      quakeArray[i] = tmpQuake;
      console.log("Quake added");
    }
    console.log(quakeArray);
    placeMarker(quakeArray);
    placeCircle(quakeArray);
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
