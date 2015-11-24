$(document).ready(function() {
  console.log("Stuff's good, frontscript active");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
  setInterval(getData(), 5000);
});


  function getData(){
  $.ajax({
  'url': 'http://apis.is/earthquake/is',
  type: 'GET',
  contentType: 'application/json',
  dataType: 'JSON',
   success: function(response) {
    console.log(response);
    postData(response);
    }
  });
  }


  function postData(quakeData) {
  $.ajax({
    url: '/data',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(quakeData),
    dataType: 'JSON'
    });
  }
