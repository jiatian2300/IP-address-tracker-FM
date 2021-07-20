const ip = document.querySelector(".ip");
const loc = document.querySelector(".location"); //const location is alr defined/ reserved const name
const time = document.querySelector(".time");
const isp = document.querySelector(".isp");

const input = document.querySelector("input");
const form = document.querySelector("form");
const header = document.querySelector("header");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchIpify();
    input.value = "";
    fetchMap();
});

/*==========
  ipify API
============*/
var api_key = "at_4HqOdkI9UUNQbjCqP9A4ttpepijQr";

// METHOD 1: Fetch
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

function removeError() {
    header.classList.remove("error");
}

function fetchIpify() {
    var url = `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${input.value}`;

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
        })
        .catch(function () {
            header.classList.add("error");
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

function fetchMap() {
    var map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
}
