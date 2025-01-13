let map, infoWindow;

function initMap(lat, lng, zoom) {

  map = new google.maps.Map(document.querySelector("#map"), {
    center: {
      lat,
      lng
    },
    zoom,
  });
  
  infoWindow = new google.maps.InfoWindow();

  return map;
}

function bindInfoWindow(marker, content) {
  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(content)
    infoWindow.open(map, marker);
  });
}

function getMap() {
  return map;
}

export {initMap, bindInfoWindow, getMap}