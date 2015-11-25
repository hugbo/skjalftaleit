// Test variables for map placement
var quake1 = new quake(64.1,-21.9,3, "15:00");
var quake2 = new quake(64.150,-21.95,8, "16.00");
var quakes = [quake1,quake2];

var map;
function initMap() {
	console.log('er inní initMap');
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 64.133, lng: -21.933},
		zoom: 8
	});

	// Test marker for Marker function
	/*
	var marker = new google.maps.Marker({
		position: {lat: 64.123, lng: -21.933},
		map: map,
		title: 'eyy, lmao'
	});
	*/

};

// Function for placing marker on map with given data
function placeMarker(arrayOfQuakes) {
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		// Places marker itself
		var marker = new google.maps.Marker({
			position : {lat: arrayOfQuakes[i].lat, lng: arrayOfQuakes[i].lng},
			map: map,
			title: 'marker number ' + i
		});
		// Sets opacity with respect to richter magnitude
		var opacity = arrayOfQuakes[i].strength / 9.0;
		if(opacity > 1.0) {opacity = 1.0}
		// Places overlay circles
		var circle = new google.maps.Circle({
			strokeColor: '#FF7700',
			strokeOpacity: opacity,
			strokeWeight: 2,
			fillColor: '#FF7700',
			fillOpacity: opacity,
			map: map,
			center: {lat: arrayOfQuakes[i].lat, lng: arrayOfQuakes[i].lng},
			radius: arrayOfQuakes[i].strength * 10000
		});
		console.log("Marker placed");
	}
};

// Function for creating object containing quake data
function quake(latitude, longitude, richter, timestamp) {
	this.lat = latitude;
	this.lng = longitude;
	this.strength = richter;
	this.time = timestamp;
};
