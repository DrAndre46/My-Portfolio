import { bindInfoWindow } from "./map.js";

let markers = [];
let markerClusterer = '';

// Funzione per aggiungere i markers alla mappa
function addMarkers(map, stores) {
  stores.forEach(store => {
    let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position:  store.coords,
      map,
    });
    bindInfoWindow(marker, createMarkerDetails(store));
    markers.push(marker);
  });

  markerClusterer = new MarkerClusterer(map, markers, {
    gridSize: 50,
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}

// Funzione per nascondere i markers
function hideMarkers() {
  markers.map(marker => marker.setMap(null));
  if(markerClusterer) {
    markerClusterer.clearMarkers();
  }
}

function refreshMarkers(map, stores) {
  hideMarkers();
  let activeMarkers = markers.filter(marker => {
    let markerPosition = marker.getPosition().toJSON();
    let activeMarker = stores.find(store => 
      store.coords.lat === markerPosition.lat &&
      store.coords.lng === markerPosition.lng
    )
    if(activeMarker) {
      marker.setMap(map);
      return true;
    }
    return false;
  });
  markerClusterer.addMarkers(activeMarkers);
}

// Creo il contenuto da visualizzare nella infoWindow
function createMarkerDetails(store) {
  return `
    <h3>${store.name}</h3>
    <p>${store.address}</p>
    <p>${store.email}</p>
    <p>${store.phone}</p>
    <a href="https://www.google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}" target="_blank">Directions</a>
  `
}

export {addMarkers, refreshMarkers}