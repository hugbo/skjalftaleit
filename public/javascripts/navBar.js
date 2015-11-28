$(document).ready(function() {
  $(function() {
    $('.header').stickyNavbar({
      activeClass: "active", // Class to be added to highlight nav elements
      sectionSelector: "scrollto", // Class of the section that is interconnected with nav links
      navOffset: 0, // Offset from the default position of this() (nav container)
      animDuration: 1000, // Duration of jQuery animation
      startAt: 0, // Stick the menu at XXXpx from the top of the this() (nav container)
      easing: "linear", // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
      animateCSS: true, // AnimateCSS effect on/off
      animateCSSRepeat: false, // Repeat animation everytime user scrolls
      bottomAnimation: false, // CSS animation on/off in case we hit the bottom of the page
      cssAnimation: "fadeInDown", // AnimateCSS class that will be added to selector
      jqueryEffects: false, // jQuery animation on/off
      jqueryAnim: "slideDown", // jQuery animation type: fadeIn, show or slideDown
      selector: "a", // Selector to which activeClass will be added, either "a" or "li"
      mobile: false // If false nav will not stick under 496px width of window
    });
  });
});
