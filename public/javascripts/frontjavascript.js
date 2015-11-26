// Current date, created when webpage is run
var d = new Date();
var startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 2);
var endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate());
var minmagnitude = 0;
var maxmagnitude = 10;

$(document).ready(function() {
  console.log("Stuff's good, frontscript active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getData(), 300000);
});

// Receive data for earthquakes and parse it
function getData() {
  //Sækja gögn af Apis.is
  $.ajax({
    'url': 'https://apis.is/earthquake/is',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'JSON',
    success: function(response) {
      postData(response);
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
