// Test variables for map placement
var quake1 = new quake(64.1,-21.9,3);
var quake2 = new quake(64.150,-21.95,3);
var quakes = [quake1,quake2];

var map;
function initMap() {
	console.log('er inní initMap');
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 64.133, lng: -21.933},
		zoom: 8
	});

	var marker = new google.maps.Marker({
		position: {lat: 64.123, lng: -21.933},
		map: map,
		title: 'eyy, lmao'
	});

	placeMarker(quakes);
};

// Function for placing marker on map with given data
function placeMarker(arrayOfQuakes) {
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		var marker = new google.maps.Marker({
			position : {lat: arrayOfQuakes[i].lat, lng: arrayOfQuakes[i].lng},
			map: map,
			title: 'marker number ' + i
		})
	}
};

// Function for creating object containing quake data
function quake(latitude, longitude, richter) {
	this.lat = latitude;
	this.lng = longitude;
	this.strength = richter;
};
