// Creating map object
var myMap = L.map("map", {
  center: [21.289373, -157.917480],
  zoom: 5
});

// Adding tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGRhbHRvbjEwMTAiLCJhIjoiY2ppZG9seXd1MDA4NDN3cGducGhqMnJvaiJ9.wPK5zXCCkvGxRp8cDQELmA', {
		accessToken: 'pk.eyJ1IjoidGRhbHRvbjEwMTAiLCJhIjoiY2ppZG9seXd1MDA4NDN3cGducGhqMnJvaiJ9.wPK5zXCCkvGxRp8cDQELmA',
		id: 'mapbox.streets',
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	})
	.addTo(myMap);


// Link to GeoJSON
var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Grabbing data with d3...
d3.json(APILink, function(data) {

  function styleInfo(feature){
      return {
          radius: getRadius(feature.properties.mag),
          fillColor: "#fff",
          color: "fff",
          weight: 1,
          opacity: 0.9,
          fillOpacity: 1
      }
  }

  function getRadius(magnitude){
      if(magnitude === 0){
          return 1
      } return magnitude * 4
  }

  L.geoJSON(data, {
      pointToLayer: function (feature, latlng){
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layers){

      }
  }).addTo(myMap);

});