// Variable for google map
var map;
// Variables for graphical objects to be placed on map
var markers = [];
var circles = [];
var heatmapping = {};
// Variable for storing current info window that is open
var currentInfoWindow = {};

// Function for initializing map
function initMap() {
	console.log('Map Initialized');
	map = new google.maps.Map(document.getElementById('map'), {
		// Initialized with focus on Reykjavik coordinates
		center: {lat: 64.133, lng: -21.933},
		zoom: 5
	});
};

// Master function for displaying appropriate graphical objects on map
function masterDisplayUpdate() {
	removeAllGraphics();
	if($('#markerCheckbox').is(':checked'))
	{
		createMarkers(quakesToDisplay);
		placeMarkers(markers);
	}
	if($('#circleCheckbox').is(':checked'))
	{
		createCircles(quakesToDisplay);
		placeCircles(circles);
	}
	if($('#heatCheckbox').is(':checked'))
	{
		createHeatmapPoints(quakesToDisplay);
		placeHeatmapPoints(heatmapping);
	}
	console.log("Master display complete")
}

// Function for removing all graphical objects from the map.
function removeAllGraphics() {
	for(var i = 0; i < markers.length; i++)
	{
		markers[i].setMap(null);
	}
	markers = [];
	for(var i = 0; i < circles.length; i++)
	{
		circles[i].setMap(null);
	}
	if(heatmapping.map !== undefined)
	{
		heatmapping.setMap(null);
	}
}

// Function for evaluating which quakes should be displayed
// based on user parameters.
function evaluateQuakes(arrayOfQuakes) {
	var tmpQuakeArray = [];
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		var quaketime = arrayOfQuakes[i].time / 1000;
		if(dateValid(quaketime, timeSliderData.from, timeSliderData.to) &&
		strengthValid(arrayOfQuakes[i].strength, richterSliderData.from, richterSliderData.to))
		{
			tmpQuakeArray.push(arrayOfQuakes[i]);
			console.log('Quake to display added');
		}
	}
	quakesToDisplay = tmpQuakeArray;
}


// Function to see if Date object falls within bounds of user parameters
function dateValid(dateOfObject, minDate, maxDate) {
	if( (minDate < dateOfObject) && (dateOfObject < maxDate) )
	{
		return true;
	}
	return false;
}

// Function to see if quake strength falls within bounds of user parameters
function strengthValid(quakeStrength, minStrength, maxStrength) {
	if((minStrength < quakeStrength) && (quakeStrength < maxStrength))
	{
		return true;
	}
	return false;
}

// Function for creating array of quake objects with data
// array from JSON array. Stores them in array named quakearray
// in file frontjavascript.js
function objectToQuakeArray(rawDataArray)
{
	for(var i = 0; i < rawDataArray.length; i++) {
		var latitude = rawDataArray[i].latitude;
		var longitude = rawDataArray[i].longitude;
		var strength = rawDataArray[i].size;
		var timestamp = new Date(rawDataArray[i].timestamp);
		var tmpQuake = new quake(latitude, longitude, strength, timestamp)
		quakeArray.push(tmpQuake);
		console.log("Quake added");
	}
}

// Function for creating markers and placing in array
function createMarkers(arrayOfQuakes) {
	var tmpArray = [];
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		var marker = new google.maps.Marker({
			position : {lat: arrayOfQuakes[i].lat, lng: arrayOfQuakes[i].lng},
			title: 'marker number ' + i
		});
		marker['quake'] = arrayOfQuakes[i];
		tmpArray.push(marker);
		console.log("Marker created");
	}
	markers = tmpArray;
	setMarkerInfo(markers);
};

// Function for placing marker on map with given data
function placeMarkers(arrayOfMarkers) {
	for(var i = 0; i < arrayOfMarkers.length; i++)
	{
		arrayOfMarkers[i].setMap(map);
		console.log("Marker placed");
	}
};

// Function for attaching info windows to markers
function setMarkerInfo(markerArray) {
	for(var i = 0; i < markerArray.length; i++)
	{
		// Content for info box
		var contentString = '<div class="markerContent">' +
				'<p>' +
					'Latitude: ' + markerArray[i].quake.lat + '<br/>' +
					'Longitude: ' + markerArray[i].quake.lng + '<br/>' +
					'Magnitude: ' + markerArray[i].quake.strength + '<br/>' +
					'Date: ' + dayFromDateObject(markerArray[i].quake.time) + '<br/>' +
					'Time: ' + timeFromDateObject(markerArray[i].quake.time)
				+ '</p>'
			'</div>';

		// Creates info window
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		markerArray[i].infowindow = infowindow;
		attachMarkerListeners(i);
	}
}

// Function for adding event listeners to markers so they display
// info windows when clicked
function attachMarkerListeners(i) {
	google.maps.event.addListener(markers[i], 'click', function() {
		if(currentInfoWindow.content !== undefined)
		{
			currentInfoWindow.close();	
		}
		this.infowindow.open(map, this);
		currentInfoWindow = this.infowindow;
	});
}

// Function for opening info window when marker is clicked
function markerClicked() {
	return function() {
		markers[i].info.open(map, markers[i]);
	}
}

// Function for creating circles
function createCircles(arrayOfQuakes) {
	var tmpArray = [];
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		// Sets opacity with respect to Richter magnitude
		var opacity = arrayOfQuakes[i].strength / 10.0;
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
		tmpArray.push(circle);
		console.log("Circle created");
	}
	circles = tmpArray;
};

// Function for placing circle on map with given data
function placeCircles(arrayOfCircles) {
	for(var i = 0; i < arrayOfCircles.length; i++)
	{
		circles[i].setMap(map);
		console.log("Circle placed");
	}
};

// Function for creating heatmap points
function createHeatmapPoints(arrayOfQuakes) {
	var heatmapData = [];
	for(var i = 0; i < arrayOfQuakes.length; i++)
	{
		// LatLng object with coordinates to be placed in the weighted points
		var latLng = new google.maps.LatLng(arrayOfQuakes[i].lat, arrayOfQuakes[i].lng)
		// Object containing heatmap data with radius in accordance with magnitude
		tmpWeight = arrayOfQuakes[i].strength / 15;
		var weightedLocation = {
			location: latLng,
			weight: tmpWeight,
			radius: 1
		}
		heatmapData.push(weightedLocation);
	}
	// Takes all weighted points and places them on single heatmap layer
	var heatmapPoints = new google.maps.visualization.HeatmapLayer({
		data: heatmapData,
		dissipating: false,
	});
	heatmapping = heatmapPoints;
}

// Function for placing heatmap data on map
function placeHeatmapPoints(heatmapInput) {
	heatmapInput.setMap(map);
}

// Function for creating object containing quake data
function quake(latitude, longitude, richter, timestamp) {
	this.lat = latitude;
	this.lng = longitude;
	this.strength = richter;
	this.time = timestamp;
};

// Function for parsing Date object into custom string containing the day
// in formar YYYY/MM/DD
function dayFromDateObject(dateObject)
{
	var stringToReturn = dateObject.getFullYear() + "/" +
	dateObject.getMonth() + "/" +
	dateObject.getDate();
	return stringToReturn;
}

// Function for parsing Date object into custom string containing time
// in format HH:MM:SS
function timeFromDateObject(dateObject)
{
	var stringToReturn = dateObject.getHours() + ":" +
	dateObject.getMinutes() + ":" +
	dateObject.getSeconds();
	return stringToReturn;
}
