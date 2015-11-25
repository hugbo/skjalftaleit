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
		$('#slider-time').ionRangeSlider({
			hide_min_max: true,
			keyboard: true,
			min: +moment().subtract(48, 'hours').format('X'),
			max: +moment().format('X'),
			from: +moment().subtract(48, 'hours').format('X'),
			to: +moment().format('X'),
			type: 'double',
			grid: true,
			grid_num: 6,
			drag_interval: true,
			force_edges: true,
			prettify: function(num) {
				var m = moment(num, 'X').locale('is');
				return m.format('Do MMMM, HH:mm');
			},
			onFinish: function(data) {
				sliderData = data;
				console.log(data);
				console.log(sliderData);
			}
		});
	});
});
