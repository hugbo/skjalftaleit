
$(function() {
	$('#slider-size').slider({
		value: 0,
		min: 0,
		max: 7,
		step: 0.5,
		slide: function( event, ui ) {
			$('#size').val('$' + ui.value);
		} 
	});
});