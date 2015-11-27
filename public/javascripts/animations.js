$('.extraIcelandToggle').click(function() {
	$('.extraIceland').toggle(500, function() {
		if ($('.extraIcelandToggle').text() === 'More') {
			$('.extraIcelandToggle').text('Less');
		} else {
			$('.extraIcelandToggle').text('More');
		}
	});
});

$('.extraIcelandGeoToggle').click(function() {
	$('.extraIcelandGeo').toggle(500, function() {
		if ($('.extraIcelandGeoToggle').text() === 'More') {
			$('.extraIcelandGeoToggle').text('Less');
		} else {
			$('.extraIcelandGeoToggle').text('More');
		}
	});
});