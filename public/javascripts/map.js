// Variable for google map
var map;
// Variables for earthquake display on map
var markers = [];
var circles = [];

// Function for initializing map
function initMap() {
	console.log('er inní initMap');
	map = new google.maps.Map(document.getElementById('map'), {
		// Initialized with focus on Reykjavik coordinates
		center: {lat: 64.133, lng: -21.933},
		zoom: 8
	});
};

// Function for creating array of quake objects with data
// array from JSON array
function objectToQuakeArray(rawDataArray)
{
	for(var i = 0; i < rawDataArray.length; i++) {
		var latitude = rawDataArray[i].latitude;
		var longitude = rawDataArray[i].longitude;
		var strength = rawDataArray[i].size;
		var timestamp = rawDataArray.timestamp;
		var tmpQuake = new quake(latitude, longitude, strength, timestamp)
		quakeArray.push(tmpQuake);
		console.log("Quake added");
	}
}

// Function for creating markers and placing in array
function createMarkers(arrayOfQuakes) {
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		var marker = new google.maps.Marker({
			position : {lat: arrayOfQuakes[i].lat, lng: arrayOfQuakes[i].lng},
			title: 'marker number ' + i
		});
		markers.push(marker);
		console.log("Marker created");
	}
};

// Function for placing marker on map with given data
function placeMarkers(arrayOfMarkers) {
	for(var i = 0; i < arrayOfMarkers.length; i++)
	{
		arrayOfMarkers[i].setMap(map);
		console.log("Marker placed");
	}
};

// Function for creating circles
function createCircles(arrayOfQuakes) {
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
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
		circles.push(circle);
		console.log("Circle created");
	}
};

// Function for placing circle on map with given data
function placeCircles(arrayOfCircles) {
	for(var i = 0; i < arrayOfCircles.length; i++)
	{
		circles[i].setMap(map);
		console.log("Circle placed");
	}
};

// Function for creating object containing quake data
function quake(latitude, longitude, richter, timestamp) {
	this.lat = latitude;
	this.lng = longitude;
	this.strength = richter;
	this.time = timestamp;
};
