var sliderData = {};

$(document).ready(function() {
	$(function() {
		$('#slider-size').ionRangeSlider({
			hide_min_max: true,
			keyboard: true,
			min: 0,
			max: 7,
			from: 0,
			to: 7,
			type: 'double',
			step: 0.25,
			grid: true,
			grid_num: 7,
			min_interval: 0.5,
			drag_interval: true,
			onFinish: function(data) {
				sliderData = data;
				console.log(data);
				console.log(sliderData);
			}
		});
	});
});
