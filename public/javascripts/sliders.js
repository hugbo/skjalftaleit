var richterSliderData = {};
var timeSliderData = {};

$(document).ready(function() {
	$(function() {
		var sliderSize = $('#slider-size');
		// Range slider for user to choose which earthquakes to display based on magnitude
		sliderSize.ionRangeSlider({
			hide_min_max: true,
			keyboard: true,
			min: 0,
			max: 10,
			from: 0,
			to: 10,
			type: 'double',
			step: 0.25,
			grid: true,
			grid_num: 10,
			min_interval: 0.5,
			drag_interval: true,
			onFinish: function(data) {
				richterSliderData = data;
				console.log(data);
			},
			onStart: function(data) {
				richterSliderData = data;
				console.log("Slider intialized and data moved");
			}

		});


		var sliderTime = $('#slider-time');
		// Range slider for user to choose which earthquakes to display based on time
		sliderTime.ionRangeSlider({
			hide_min_max: true,
			keyboard: true,
			min: +moment().subtract(48, 'hours').format('X'), // Two days before current time (unix)
			max: +moment().format('X'), // Current time (unix)
			from: +moment().subtract(48, 'hours').format('X'),
			to: +moment().format('X'),
			type: 'double',
			grid: true,
			grid_num: 6,
			drag_interval: true,
			force_edges: true,
			prettify: function(num) {
				// Translate unix time to standard format
				var m = moment(num, 'X').locale('is');
				return m.format('Do MMMM, HH:mm');
			},
			onFinish: function(data) {
				timeSliderData = data;
				console.log(data);
			},
			onFinish: function(data) {
				timeSliderData = data;
			}
		});

		$('#markerCheckbox').click(function() {
			console.log("Marker box clicked");
		});

		$('#circleCheckbox').click(function() {
			console.log("#circleCheckbox");
		});

		$('#heatCheckbox').click(function() {

		})
	});
});
