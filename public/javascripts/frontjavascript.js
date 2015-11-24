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
  dataType: 'JSON',
   success: function(response) {
    console.log(response);
    postData(response);
    }
  });
  }


  function postData(data) {
  $.ajax({
    url: 'http://localhost:8080/data',
    type: 'POST',
    data: data,
    dataType: 'JSON',
    success: function() {
      alert('Virkaði!!');
    }
  });
  }
