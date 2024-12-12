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

// listen('change', mapSwitch, (e) => {
//     toggleMap(e.target.checked);
// })

// function toggleMap(checked) {
//     map = new mapboxgl.Map({
//         container: mapContainer,
//         style: checked ? 'mapbox://styles/mapbox/standard-satellite' : 'mapbox://styles/mapbox/standard',
//         center: [-106.346771, 56.130366],
//         pitch: 25,
//         zoom: 4
//     });  
    
//     viewLbl.innerText = checked ? 'Satellite View' : 'Standar View';
// }

// function setCenter(center) {
//     map.easeTo({
//         center: center,
//         duration: 1000,
//         pitch: 50,
//         zoom: 16,
//     });
// }

// function track() {
//     function getLocation(position) {
//         let { latitude, longitude } = position.coords;
//         const currentPosition = [longitude, latitude];
//         new mapboxgl.Marker({
//             color: "#278295",
//             draggable: false,
//         }).setLngLat(currentPosition).addTo(map);

//         setCenter(currentPosition);
//     }

//     if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
//     } else {
//         console.log('Your browser does not support the Geolocation API.');
//     }
// }

function getLocation(position) { 
    let { latitude, longitude } = position.coords;
    
    map.setCenter([longitude, latitude]);
    map.setZoom(15);

    new mapboxgl.Marker({
        color: "#001f3d",
        draggable: false,        
    }).setLngLat([longitude, latitude]).addTo(map); 
    
    console.log('>>>>> Ubicación obtenida: ' + latitude + ', ' + longitude);            
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
        console.log(">>>> 1");
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, accuracy);
    } else {
        console.log('Your browser does not support the Geolocation API.');
    }
}

function errorHandler(error) {
    console.log(error.message);
}