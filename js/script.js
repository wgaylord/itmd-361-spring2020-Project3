function initMap() {
    // The location of IIT
    var IIT = { lat: 41.831349, lng: -87.627269 };
    // The map, centered at Bourg-Saint-Maurice
    var map = new google.maps.Map(document.getElementById('map'),{'center':IIT});


}

google.maps.event.addDomListener(window, 'load', initMap);