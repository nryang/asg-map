/**
 * amphibians.org Map
 * 
 * Uses Google Maps JavaScript V3 API
 * 
 * @author Nathan Yang
 * 
 * @file map.js
 * @version 1.3
 * @since 2013-02-01
 * 
 * @copyright Copyright &copy; 2013 Amphibian Specialist Group
 */

/* Loads map on document load */
google.maps.event.addDomListener(window, 'load', initialize);

/* Global variables */
var map; /* Google map */
var markers = []; // Array that stores markerTooltips

/**
 * Initializes a map with markers and tooltips
 */
function initialize() {
	/********** Map options **********/
	var mapOptions = {
		center: new google.maps.LatLng(0.0,0.0),
		disableDoubleClickZoom: true,
		draggable: false,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		overviewMapControl: false,
		panControl: false,
		rotateControl: false,
		scrollwheel: false,
		streetViewControl: false,
		zoom: 2,
		zoomControl: false
	};

	/* Creates the map using the options above */
	map = new google.maps.Map(document.getElementById("map_projects"), mapOptions);

	/********** Markers **********/

	/* Add markers below! */

	markers.push(new MarkerTooltip(
		"grants", // category
		38.891367, // longitude
		10.033006, // latitude
		"http://www.amphibians.org/", // url
		"Grant #1", // title
		"http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png", // image
		"Body" // body
	));

	markers.push(new MarkerTooltip(
		"grants",
		30.021841,
		31.209703,
		"http://www.amphibians.org/",
		"Grant #2",
		"http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png",
		"Grant #2 Body Text"
	));

	markers.push(new MarkerTooltip(
		"groups",
		25.019507,
		121.570237,
		"http://www.amphibians.org/",
		"Group #1",
		"http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png",
		"Group #1 Body Text"
	));

	markers.push(new MarkerTooltip(
		"projects",
		3.387226,
		-73.07016,
		"http://www.amphibians.org/our-work/projects/colombia/",
		"Colombia",
		"http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png",
		"More threatened amphibians than any other country and largely restricted to the highly fragmented subtropical and montane forest"
	));

	markers.push(new MarkerTooltip(
		"projects",
		15.497824,
		-90.430161,
		"http://www.amphibians.org/our-work/projects/guatemala/",
		"Guatemala",
		"http://www.amphibians.org/wp-content/uploads/2011/03/guatemala.png",
		"58 hectares of dry forest being purchased to safeguard a newly discovered species of salamander that is restricted to this area"
	));

	markers.push(new MarkerTooltip(
		"projects",
		-0.617748,
		120.433428,
		"http://www.amphibians.org/our-work/projects/sulawesi/",
		"Sulawesi",
		"http://www.amphibians.org/wp-content/uploads/2011/03/sulawesi.png",
		"Establishment of a new protected area in Mt. Tompotika, an area that is the most biologically valuable and most immediately threatened"
	));

	markers.push(new MarkerTooltip(
		"projects",
		-20.154966,
		46.492276,
		"http://www.amphibians.org/our-work/projects/madagascar/",
		"Madagascar",
		"http://www.amphibians.org/wp-content/uploads/2011/03/madagascar.png",
		"Exceptional diversity of amphibians yet 100% of over 270 described species are endemic to the island with a quarter threatened with extinction"
	));
	
	
	/* Makes clicking each marker redirect to a URL and add tooltips */
	for (var idx = 0; idx < markers.length; idx++) {
		google.maps.event.addListener(markers[idx].marker, 'click', function() {
		  window.location.href = this.url;
		});
		
		/* Adds tooltip to marker */
		createTooltip(markers[idx]);
	}
		
	/* Creates the legend and display on the map */
	var legendDiv = document.createElement('DIV');
	var legend = new Legend(legendDiv, map);
	legendDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
}

/**
 * Constructs a marker with a tooltip.
 * 
 * @param category category name
 * @param latitude latitude coordinates
 * @param longitude longitude coordinates
 * @param url marker link
 * @param title tooltip title
 * @param image tooltip image
 * @param body tooltip body
 */

function MarkerTooltip(category, latitude, longitude, url, title, image, body) {
	this.marker = new google.maps.Marker({
			icon: getIconPath(category),
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			url: url
	});
	this.category = category;
	this.latitude = latitude;
	this.longitude = longitude;
	this.url = url;
	this.title = title;
	this.image = image;
	this.body = body;
}

/** Prototype for MarkerTooltip */
MarkerTooltip.prototype = {
	constructor: MarkerTooltip,
}

/**
 * Add categories and their respective image paths here!
 * Retrieves path to icon image based on category
 * 
 * @param category category name
 * @return path to icon
 */
function getIconPath(category) {
	switch (category) {
		case "groups":
			return "images/group.png";
			break;
			
		case "grants":
			return "images/grant.png";
			break;
			
		case "projects":
			return "images/project.png";
			break;
	}
	
	return null;
}

/**
 * Creates a tooltip
 * 
 * @param marker marker
 */
function createTooltip(marker) {
	var tooltipOptions = {
		marker: marker.marker,
		content: generateTooltipContent(marker),
		cssClass: 'tooltip' // Name of CSS class to apply to tooltip
	};
	
	var tooltip = new Tooltip(tooltipOptions);		
}

/**
 * Generates HTML code that displays tooltip
 * 
 * @param marker marker
 * @param title title of tooltip
 * @param image image associated with tooltip
 * @param body body text of tooltip
 * @param link url of marker
 */
function generateTooltipContent(marker) {
	var result = "";
	var markerIconPath;

	if (marker) { /* Proceeds iif marker is not null */
		markerIconPath = getIconPath(marker.category);
	
		/* Adds marker image to string */
		if (markerIconPath) { /* Proceeds iif marker icon path is not null */
			result += "<img src=\"" + markerIconPath + "\" class=\"category-icon\" width=\"16px\" height=\"19px\" />";
		}
		
		/* Adds marker's category to string */
		if (markerIconPath) { /* Proceeds iif marker icon path is not null */
			/* Capitalizes first letter of category string */
			result += marker.category.charAt(0).toUpperCase() + marker.category.slice(1);
		}
	}
	
	if (marker.title) { /* Proceeds iif title is not null */
		result += "<h1>" + marker.title + "</h1>";
	}
	
	if (marker.image) { /* Proceeds iif image is not null */
		result += "<div class=\"tooltip-image\"><img src=\"" + marker.image + "\" /></div>"
	}
	
	if (marker.body) { /* Proceeds iif body is not null */
		result += "<div class=\"tooltip-body\">" + marker.body + "</div>";
	}
	
	return result;
}

/**
 * Shows all markers of a particular category, and ensures the checkbox is checked
 */
function show(category) {
	for (var idx = 0; idx < markers.length; idx++) {
		if (markers[idx].category === category) {
			markers[idx].marker.setVisible(true);
		}
	}
	
	/* Checks the checkbox */
	window.onload = function() {
		document.getElementById(category + "box").checked = true;
	};
}

/**
 * Hides all markers of a particular category, and ensures the checkbox is unchecked
 */
function hide(category) {
	for (var idx = 0; idx < markers.length; idx++) {
		if (markers[idx].category === category) {
			markers[idx].marker.setVisible(false);
		}
	}
	
	/* Clears the checkbox */
	window.onload = function() {
		document.getElementById(category + "box").checked = false;
	};
}

/**
 * Creates a legend
 * 
 * @param controlDiv
 * @param map map
 */
function Legend(controlDiv, map) {
	/* Sets CSS styles for the div containing the control */
	controlDiv.className = "map-legend";

	/* Sets CSS for the control border */
	var controlUI = document.createElement('DIV');
	controlUI.className = "map-legend-ui";
	controlUI.title = 'Legend';
	controlDiv.appendChild(controlUI);

	/* Sets CSS for the control text */
	var controlText = document.createElement('DIV');
	controlText.className = "map-legend-text";
  
	/* Adds the text and icons on legend */
	controlText.innerHTML =
		'<form action="#">' +
		'<div class="legend-heading">Filter</div>' +
		'<input type="checkbox" id="grantsbox" onclick="boxClick(this,\'grants\')" checked="checked" /><img src="images/grant.png" class="category-icon" /> Grants &nbsp; &nbsp;' +
		'<input type="checkbox" id="groupsbox" onclick="boxClick(this,\'groups\')" checked="checked" /><img src="images/group.png" class="category-icon" /> Groups &nbsp; &nbsp;' +
		'<input type="checkbox" id="projectsbox" onclick="boxClick(this,\'projects\')" checked="checked" /><img src="images/project.png" class="category-icon" /> Projects' +
		'</form>';
		
	controlUI.appendChild(controlText);
}

/**
 * Shows or hides markers based on categories when a checkbox is checked or
 * unchecked
 * 
 * @param box
 * @param category
 */
function boxClick(box, category) {
	if (box.checked) {
		show(category);
		
	} else {
		hide(category);
	}
}
