
var map;
function initMap() {
	console.log('er inní initMap');
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 64.133, lng: -21.933},
		zoom: 8
	});
};