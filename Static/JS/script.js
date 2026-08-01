const map = L.map('map').setView([20, 0],2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CARTO'
}).addTo(map);

setTimeout(() => {
    map.invalidateSize();
}, 100);

// L.tileLayer(
//     'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
//     {
//         maxZoom: 20
//     }
// ).addTo(map);

// L.tileLayer(
// 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
// ).addTo(map);



const marker = L.marker([latitude, longitude]).addTo(map);

marker.bindPopup("🛰 ISS");
let issPath = [];
const orbitLine = L.polyline([],{

    color:"#00ff55",

    weight:3,

    opacity:0.8

}).addTo(map);

async function updateISS(){

    const response = await fetch("/iss-data");

    const data = await response.json();

    console.log("Script Loaded");

    document.getElementById("latitude").innerHTML = data.latitude;

    document.getElementById("longitude").innerHTML = data.longitude;

    document.getElementById("altitude").innerHTML = `${data.altitude} km`;

    document.getElementById("velocity").innerHTML = `${data.velocity} km/h`;

    document.getElementById("visibility").innerHTML = data.visibility;

    marker.setLatLng([data.latitude, data.longitude]);
    marker.bindPopup(`
    <b>🛰 ISS (ZARYA)</b><br><br>

    Latitude : ${data.latitude}<br>

    Longitude : ${data.longitude}<br>

    Altitude : ${data.altitude} km<br>

    Velocity : ${data.velocity} km/h<br>

    Visibility : ${data.visibility}

    `);
    issPath.push([data.latitude, data.longitude]);

    if (issPath.length > 100){

    issPath.shift();

    }

    orbitLine.setLatLngs(issPath);

    if(data.visibility === "daylight"){

    document.getElementById("iss-status").innerHTML =
    `<i class="fa-solid fa-sun" style="color:yellow"></i> Daylight`;

    }
    else{

    document.getElementById("iss-status").innerHTML =
    '<i class="fa-solid fa-moon" style="color:yellow"></i> Night';

    }

}

updateISS();
setInterval(updateISS, 5000);

