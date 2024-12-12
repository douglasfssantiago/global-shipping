'use strict';

import { select, selectById, listen } from "./utils.js";

const APP_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWF4MjI4IiwiYSI6ImNscTN4bGV3djAxNzIyaXVrOTl1cHVsMDcifQ.0qB6pxCGIinj_K9wTEzeWQ';
const trackBtn = select('.track-btn');
const mapContainer = selectById('map');
const accuracy = {
    enabledHighAccuray: true
};

mapboxgl.accessToken = APP_MAPBOX_ACCESS_TOKEN;
let map = null;
goToCurrentPosition();   

if (!mapboxgl.supported()) {
    console.log('Your browser does not support the WebGL.');
}

listen("click", trackBtn, () => {
    track();
});

function getLocation(position) { 
    let { latitude, longitude } = position.coords;
    
    map.setCenter([longitude, latitude]);
    map.setZoom(15);

    new mapboxgl.Marker({
        color: "#001f3d",
        draggable: false,        
    }).setLngLat([longitude, latitude]).addTo(map); 
}

function goToCurrentPosition() {
    map = new mapboxgl.Map({ 
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [-74.5, 40],
        pitch: 25,
        zoom: 9 
    });        
        
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, accuracy);
    } else {
        console.log('Your browser does not support the Geolocation API.');
    }
}

function errorHandler(error) {
    console.log(error.message);
}