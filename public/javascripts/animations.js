'use strict';

$('.earthquakeToggle').click(function() {
  $('.extraEarthquakes').toggle(500, function() {
    if ($('.earthquakeToggle').text() === 'More') {
      $('.earthquakeToggle').text('Less');
    } else {
      $('.earthquakeToggle').text('More');
      $('html, body').animate({scrollTop: 
      $('#earthquakeSection').offset().top}, 500);
    }
  });
});

$('.extraIcelandToggle').click(function() {
  $('.extraIceland').toggle(500, function() {
    if ($('.extraIcelandToggle').text() === 'More') {
      $('.extraIcelandToggle').text('Less');
    } else {
      $('.extraIcelandToggle').text('More');
      $('html, body').animate({scrollTop: 
      $('#icelandSection').offset().top}, 500);
    }
  });
});

$('.extraIcelandGeoToggle').click(function() {
  $('.extraIcelandGeo').toggle(500, function() {
    if ($('.extraIcelandGeoToggle').text() === 'More') {
      $('.extraIcelandGeoToggle').text('Less');
    } else {
      $('.extraIcelandGeoToggle').text('More');
      $('html, body').animate({scrollTop: 
      $('#icelandGeoSection').offset().top}, 500);
    }
  });
});

$('.mapInfoToggle').click(function() {
  $('.mapInfoText').toggle(500, function() {
    if ($('.mapInfoToggle').text() === 'Show instructions') {
      $('.mapInfoToggle').text('Hide instructions');
    } else {
      $('.mapInfoToggle').text('Show instructions');
    }
  });
});
