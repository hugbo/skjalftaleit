'use strict';

$(document).ready(function() {
  $(function() {
    $('.header').stickyNavbar({
      activeClass: 'active',
      sectionSelector: 'scrollto',
      navOffset: 0,
      animDuration: 1000,
      startAt: 0,
      easing: 'linear',
      animateCSS: true,
      animateCSSRepeat: false,
      bottomAnimation: false,
      cssAnimation: 'fadeInDown',
      jqueryEffects: false,
      jqueryAnim: 'slideDown',
      selector: 'a',
      mobile: false
    });
  });
});
