/**
 * amphibians.org Map
 * 
 * Uses Google Maps JavaScript V3 API
 * 
 * @author Nathan Yang
 * 
 * @file map.js
 * @version 1.2
 * @since 2013-01-31
 * 
 * @copyright Copyright &copy; 2013 Amphibian Specialist Group
 */

/* Global variables */
var markers = []; // Array that stores markers

/**
 * Creates a tooltip
 * 
 * @param marker marker
 * @param key index
 * @param tooltip text
 */
function createTooltip(marker, title, image, body) {
	var tooltipOptions = {
		marker: marker,
		content: generateTooltipContent(marker, title, image, body, marker.url),
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
function generateTooltipContent(marker, title, image, body, link) {
	var result = "";
	
	if (marker) { /* Proceeds iif marker is not null */
		/* Adds marker image to string */
		if (marker.icon) { /* Proceeds iif marker.icon is not null */
			result += "<img src=\"" + marker.icon + "\" class=\"category-icon\" width=\"16px\" height=\"19px\" />";
		}
		
		
		/* Adds marker's category to string */
		if (marker.icon) { /* Proceeds iif marker.icon is not null */
			result += convertIconToCategory(marker.icon);
		}
	}
	
	if (title) { /* Proceeds iif title is not null */
		result += "<h1>" + title + "</h1>";
	}
	
	if (image) { /* Proceeds iif image is not null */
		result += "<div class=\"tooltip-image\"><img src=\"" + image + "\" /></div>"
	}
	
	if (body) { /* Proceeds iif body is not null */
		result += "<div class=\"tooltip-body\">" + body + "</div>";
	}
	
	return result;
}

/**
 * Converts a marker image to a string that represents its category.
 * 
 * @param icon image file
 * @return string representing the category of marker image if image is one of:
 * (1) images/group.png; (2) images/grant.png; or (3) images/project.png; otherwise returns null
 */
function convertIconToCategory(icon) {
	switch (icon) {
		case "images/group.png":
			return "Groups";
			break;
		
		case "images/grant.png":
			return "Grants";
			break;
		
		case "images/project.png":
			return "Projects";
			break;
	}
	
	return null;
}

/**
 * Initializes a map with markers
 */
function initialize() {
		/* Coordinates to center map */
		var homeLatlng = new google.maps.LatLng(0.0,0.0);
	
		/********** Coordinates for each marker **********/

		/* Grants coordinates */
		var grant1Latlng = new google.maps.LatLng(38.891367,10.033006);
		var grant2Latlng = new google.maps.LatLng(30.021841,31.209703);
		var grant3Latlng = new google.maps.LatLng(40.74924,-73.985545);
		
		/* Groups coordinates */
		var group1Latlng = new google.maps.LatLng(25.019507,121.570237);
		var group2Latlng = new google.maps.LatLng(43.102487,-79.083126);
		var group3Latlng = new google.maps.LatLng(24.607069,-78.050171);

		/* Projects coordinates */
		var colombiaLatlng = new google.maps.LatLng(3.387226,-73.07016);
		var guatemalaLatlng = new google.maps.LatLng(15.497824,-90.430161);
		var sulawesiLatlng = new google.maps.LatLng(-0.617748,120.433428);
		var madagascarLatlng = new google.maps.LatLng(-20.154966,46.492276);

		/********** Map options **********/

		var myOptions = {
			center: homeLatlng,
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
		
		var map = new google.maps.Map(document.getElementById("map_projects"), myOptions);

		/********** Markers **********/

		/* Grants markers */
		
		markers[0] = new google.maps.Marker({
			icon: "images/grant.png",
			position: grant1Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});
		
		markers[1] = new google.maps.Marker({
			icon: "images/grant.png",
			position: grant2Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});
		
		markers[2] = new google.maps.Marker({
			icon: "images/grant.png",
			position: grant2Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});
		
		/* Groups markers */
		
		markers[3] = new google.maps.Marker({
			icon: "images/group.png",
			position: group1Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});

		markers[4] = new google.maps.Marker({
			icon: "images/group.png",
			position: group2Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});
		
		markers[5] = new google.maps.Marker({
			icon: "images/group.png",
			position: group3Latlng,
			map: map,
			url: "http://www.amphibians.org/"
		});

		/* Projects markers */
		
		markers[6] = new google.maps.Marker({
			icon: "images/project.png",
			position: colombiaLatlng,
			map: map,
			url: "http://www.amphibians.org/our-work/projects/colombia/"
		});
		
		markers[7] = new google.maps.Marker({
			icon: "images/project.png",
			position: guatemalaLatlng,
			map: map,
			url: "http://www.amphibians.org/our-work/projects/guatemala/"
		});

		markers[8] = new google.maps.Marker({
			icon: "images/project.png",
			position: sulawesiLatlng,
			map: map,
			url: "http://www.amphibians.org/our-work/projects/sulawesi/"
		});
		
		markers[9] = new google.maps.Marker({
			icon: "images/project.png",
			position: madagascarLatlng,
			map: map,
			url: "http://www.amphibians.org/our-work/projects/madagascar/"
		});
		
		
		/********** Tooltips **********/
		
		var tooltip_title = []; // Array that stores tooltip titles
		var tooltip_image = []; // Array that stores tooltip images
		var tooltip_body = []; // Array that stores tooltip bodies
		
		/* Title and body for each tooltip */
		tooltip_title[0] = "Grant #1";
		tooltip_image[0] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[0] = "Body";
		
		tooltip_title[1] = "Grant #2";
		tooltip_image[1] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[1] = "Body";
		
		tooltip_title[2] = "Grant #3";
		tooltip_image[2] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[2] = "Body";
		
		tooltip_title[3] = "Group #1";
		tooltip_image[3] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[3] = "Body";
		
		tooltip_title[4] = "Group #2";
		tooltip_image[4] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[4] = "Body";
		
		tooltip_title[5] = "Group #3";
		tooltip_image[5] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[5] = "Body";
		
		tooltip_title[6] = "Colombia";
		tooltip_image[6] = "http://www.amphibians.org/wp-content/uploads/2011/03/colombia.png";
		tooltip_body[6] = "More threatened amphibians than any other country and largely restricted to the highly fragmented subtropical and montane forest";
		
		tooltip_title[7] = "Guatemala";
		tooltip_image[7] = "http://www.amphibians.org/wp-content/uploads/2011/03/guatemala.png";
		tooltip_body[7] = "58 hectares of dry forest being purchased to safeguard a newly discovered species of salamander that is restricted to this area";
		
		tooltip_title[8] = "Sulawesi";
		tooltip_image[8] = "http://www.amphibians.org/wp-content/uploads/2011/03/sulawesi.png";
		tooltip_body[8] = "Establishment of a new protected area in Mt. Tompotika, an area that is the most biologically valuable and most immediately threatened";
		
		tooltip_title[9] = "Madagascar";
		tooltip_image[9] = "http://www.amphibians.org/wp-content/uploads/2011/03/madagascar.png";
		tooltip_body[9] = "Exceptional diversity of amphibians yet 100% of over 270 described species are endemic to the island with a quarter threatened with extinction";
		
		/* Makes clicking each marker redirect to a URL and add tooltips */
		for (var idx = 0; idx < markers.length; idx++) {
			google.maps.event.addListener(markers[idx], 'click', function() {
			  window.location.href = this.url;
			});
			
			/* Adds tooltip to marker */
			createTooltip(markers[idx], tooltip_title[idx], tooltip_image[idx], tooltip_body[idx]);
		}
		
	/* Creates the legend and display on the map */
	var legendDiv = document.createElement('DIV');
	var legend = new Legend(legendDiv, map);
	legendDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
}

/**
 * Shows all markers of a particular category, and ensures the checkbox is checked
 */
function show(category) {
	for (var i = 0; i < markers.length; i++) {
		if (convertIconToCategory(markers[i].icon).toLowerCase() == category) {
			markers[i].setVisible(true);
		}
	}
	
	/* Checks the checkbox */
	window.onload = function() {
		document.getElementById(category + "box").checked = true;
	};
}

/**
 * Hides all markers of a particular category, and ensures the checkbox is cleared
 */
function hide(category) {
	for (var i = 0; i < markers.length; i++) {
		if (convertIconToCategory(markers[i].icon).toLowerCase() == category) {
			markers[i].setVisible(false);
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
	// Set CSS styles for the DIV containing the control
	controlDiv.className = "map-legend";

	// Set CSS for the control border
	var controlUI = document.createElement('DIV');
	controlUI.className = "map-legend-ui";
	controlUI.title = 'Legend';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control text
	var controlText = document.createElement('DIV');
	controlText.className = "map-legend-text";
  
	// Add the text
	controlText.innerHTML =
		'<form action="#">' +
		'<div class="legend-heading">Filter</div>' +
		'<input type="checkbox" id="grantsbox" onclick="boxclick(this,\'grants\')" checked="checked" /><img src="images/grant.png" class="category-icon" /> Grants &nbsp; &nbsp;' +
		'<input type="checkbox" id="groupsbox" onclick="boxclick(this,\'groups\')" checked="checked" /><img src="images/group.png" class="category-icon" /> Groups &nbsp; &nbsp;' +
		'<input type="checkbox" id="projectsbox" onclick="boxclick(this,\'projects\')" checked="checked" /><img src="images/project.png" class="category-icon" /> Projects' +
		'</form>';
		
	controlUI.appendChild(controlText);
}

/**
 * A checkbox has been clicked.
 * 
 * @param box
 * @param category
 */
function boxclick(box, category) {
	if (box.checked) {
		show(category);
		
	} else {
		hide(category);
	}
}

/* Loads map */
google.maps.event.addDomListener(window, 'load', initialize);
