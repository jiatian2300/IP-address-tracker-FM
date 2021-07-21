const ip = document.querySelector(".ip");
const loc = document.querySelector(".location"); //const location is alr defined/ reserved const name
const time = document.querySelector(".time");
const isp = document.querySelector(".isp");

const input = document.querySelector("input");
const form = document.querySelector("form");
const header = document.querySelector("header");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchHandler(input.value);
    fetchIpify();
    input.value = "";
});

/*==========
  ipify API
============*/
var api_key = "at_4HqOdkI9UUNQbjCqP9A4ttpepijQr";
var lat = 51.505;
var long = -0.09;
var ipAdd = "";
var domain = "";

// METHOD 1: Fetch
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

function removeError() {
    header.classList.remove("ip_error");
    header.classList.remove("domain_error");
}

function searchHandler(input) {
    var expression =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    domain = ipAdd = "";
    if (input.match(regex)) {
        domain = input;
    } else {
        ipAdd = input;
    }
}

function fetchIpify() {
    var url = `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ipAdd}&domain=${domain}`;

    fetch(url)
        .then(handleErrors)
        .then(function (data) {
            ip.innerHTML = data.ip;
            if (data.location.region) {
                region = ", " + data.location.region;
            } else region = "";
            loc.innerHTML = `${data.location.city}${region}, ${data.location.country}`;
            time.innerHTML = `UTC ${data.location.timezone}`;
            isp.innerHTML = data.isp;

            lat = data.location.lat;
            long = data.location.lng;

            updateMap();
        })
        .catch(function () {
            header.classList.add(domain ? "domain_error" : "ip_error");
            ip.innerHTML = loc.innerHTML = time.innerHTML = isp.innerHTML = "-";
        });
}

// METHOD 2: jQuery.ajax()

/*function fetchIpify() {
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: { apiKey: api_key, ipAddress: ipAdd },
        success: function (data) {
            ip.innerHTML = input.value;
            loc.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
            time.innerHTML = `UTC ${data.location.timezone}`;
            isp.innerHTML = data.isp;
        },
        error: function () {
            console.log("fail");
        },
    });
}*/

/*===============
  leaflet.js API
=================*/

// Check the screen size to determine if zoom controls are necessary
var showZoom = true;
if (screen.width < 555) showZoom = false;

// Initialize map, set view to lat long and set zoom level
var mymap = L.map("map", { zoomControl: showZoom }).setView([lat, long], 16);

// Add tile layer to map
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            "pk.eyJ1IjoiZWxhaW5ldGFuMTIzIiwiYSI6ImNrcmMzdGFnOTAwbWMyem4wbHg0MGJiOW8ifQ.EKqdbz4YM_ILsDo8nA9XRQ",
    }
).addTo(mymap);

// Custom marker icon
var locIcon = L.icon({
    iconUrl: "./images/icon-location.svg",

    iconSize: [35, 43], // size of the icon
    iconAnchor: [22, 43], // point of the icon which will correspond to marker's location
});

// Adding marker to location
const marker = L.marker([lat, long], { icon: locIcon }).addTo(mymap);

// Update map view and marker location when a new search is made
function updateMap() {
    marker.setLatLng([lat, long]);
    mymap.setView([lat, long], 16);
}
