var map;
var satelliteMarker;

function initMap(){

  var el = document.getElementById('map');

  var mapOptions = {
	center: {lat:0,lng:0},
	zoom: 1,
	mapTypeId: google.maps.MapTypeId.SATELLITE,
	mapTypeControlOptions: {
	  position: google.maps.ControlPosition.BOTTOM_CENTER
	}
  };

  var map = new google.maps.Map(el, mapOptions);


  var satImage = {
    url: 'img/sat.png',
    size: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 10)
  };
	
  var DotImage = {
    url: 'img/dot.png',
    size: new google.maps.Size(10, 10),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(4, 4)
  };
	
  var ISSDescription = '<h3>ISS</h3>';

  var ISSinfowindow = new google.maps.InfoWindow({
    content: ISSDescription,
	maxWidth:400
  });

  satelliteMarker = new google.maps.Marker({
    map: map,
    icon: satImage,
    zIndex:1,
  });
	
  google.maps.event.addListener(satelliteMarker, 'mouseover', function() {
    ISSinfowindow.open(map, satelliteMarker);
  });
	
  var IITDescription = '<h3>IIT</h3>';

  var IITinfowindow = new google.maps.InfoWindow({
    content: IITDescription,
	maxWidth:400
  });
	
  var IITMarker = new google.maps.Marker({
    position: {lat:41.835117,lng: -87.627130},
    map: map,
    icon: DotImage,
    zIndex: 0
  });
	
  google.maps.event.addListener(IITMarker, 'mouseover', function() {
    IITinfowindow.open(map, IITMarker);
  });
	
  var DCDescription = '<h3>Capital</h3>';

  var DCinfowindow = new google.maps.InfoWindow({
    content: DCDescription,
	maxWidth:400
  });
	
  var DCMarker = new google.maps.Marker({
    position: {lat:38.894047,lng: -77.039304},
    map: map,
    icon: DotImage,
    zIndex: 0
  });
	
  google.maps.event.addListener(DCMarker, 'mouseover', function() {
    DCinfowindow.open(map, DCMarker);
  });
	
	
  getISSPosition();
  setInterval(getISSPosition,100);
}

function getISSPosition(){
	//Using ISS TLE from 4/21/2020 Prediction code using the satellite.js library is based off my work from https://satnogs.jwgtechs.com
  var satrec = satellite.twoline2satrec("1 25544U 98067A   20112.86857601  .00000638  00000-0  19540-4 0  9997","2 25544  51.6434 267.2075 0001710 173.4370 339.7378 15.49297823223285");
  var gmst = satellite.gstime(new Date());
  var positionAndVelocity = satellite.propagate(satrec, new Date());
  var positionEci = positionAndVelocity.position;
  var positionGd = satellite.eciToGeodetic(positionEci, gmst);
  var curLat = degress(positionGd.latitude);
  var curLng = degress(positionGd.longitude);
  satelliteMarker.setPosition({lat:curLat,lng:curLng});
}

function degress(radians) {
  return radians * 180 / Math.PI;
};


google.maps.event.addDomListener(window, 'load', initMap);