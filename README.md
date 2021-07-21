# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Links

- Solution URL: [Github Page](https://jiatian2300.github.io/IP-address-tracker-FM/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

Center position absolute div
```css
.error {
    position: relative;
    p {
        width: fit-content;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
```

Javascript API fetch
```js
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
```

### Continued development


### Useful resources

- [Javascript Fetch](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data)
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.