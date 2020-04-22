var map;
var satelliteMarker;

function initMap(){
	//alert('it works');
	var el = document.getElementById('map');
	var IIT = new google.maps.LatLng(41.835117, -87.627130);
	var mapOptions = {
		center: IIT,
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		}
	};

	var map = new google.maps.Map(el, mapOptions);


	var satImage = {
    url: 'img/sat.png',
    size: new google.maps.Size(20, 20),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 10)
	};
	
	var iitDotImage = {
    url: 'img/dot.png',
    size: new google.maps.Size(10, 10),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(4, 4)
	};
	


	satelliteMarker = new google.maps.Marker({
		position: getSatPosition(),
		map: map,
		icon: satImage,
		zIndex:1
	});
	
	var iit = new google.maps.Marker({
		position: IIT,
		map: map,
		icon: iitDotImage,
		zIndex: 0
	});

	

}

function getSatPosition(){
	//Using ISS TLE from 4/21/2020 Prediction code using the satellite.js library is based off my work from https://satnogs.jwgtechs.com
	var satrec = satellite.twoline2satrec("1 25544U 98067A   20112.86857601  .00000638  00000-0  19540-4 0  9997","2 25544  51.6434 267.2075 0001710 173.4370 339.7378 15.49297823223285");

	var gmst = satellite.gstime(new Date());
    var positionAndVelocity = satellite.propagate(satrec, new Date());
    var positionEci = positionAndVelocity.position;
    var positionGd = satellite.eciToGeodetic(positionEci, gmst);
    var curLat = degress(positionGd.latitude);
    var curLng = degress(positionGd.longitude);
	return {Lat:curLat,Lng:curLng};
}

function degress(radians) {
  return radians * 180 / Math.PI;
};


google.maps.event.addDomListener(window, 'load', initMap);