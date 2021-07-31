var myMap = L.map("mapid", {
    center: [42.877742, -97.380979],
    zoom: 10
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution:"© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function(data) {
    
    function mapLayout(feature) {
        return {
            color: "#000000",
            opacity: 2,
            fillOpacity: 2, 
            fillColor: chooseColor(feature.properties.size),
            radius: circleRadius(feature.properties.size),
            stroke: true,
            weight: .5
        };
    }
    function chooseColor(size) {
        switch (size) {
            case size > 90:
                return "#CB2B3E";
            case size > 70:
                return "#CB8427";
            case size > 50:
                return "#FFD326";
            case size > 30:
                return "#CAC428";
            case size > 10:
                return "#2AAD27";
            default:
                return "#2C99EA";
        }
    }

    function circleRadius(eq_mag) {
        if (eq_mag === 0) {
            return 1;
        }
        return eq_mag * 3
    }
})