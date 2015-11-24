$(document).ready(function() {
  console.log("Stuff's good");
  // Remove navigation buttons from banner
  $('.carousel-indicators ').css("display", "none");
})

function getData() {
  $.ajax({
  'url': 'http://apis.is/earthquake/is',
   success: function(response) {
    console.log(response);
    }
  });
}
