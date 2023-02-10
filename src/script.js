function submitIpAddress(event) {
  event.preventDefault();
  let input = document.querySelector("#search-id-input");
  showIpLocation(input.value);
}

let form = document.querySelector("#id-form");
form.addEventListener("submit", submitIpAddress);

function searchIpAddress(response) {
  //key information and location
  let ipAddressElement = document.querySelector("#ip-address");
  ipAddressElement.innerHTML = response.data.ip;

  let locationElement = document.querySelector("#location");
  const region = response.data.location.region;
  const city = response.data.location.city;
  const postalCode = response.data.location.postalCode;
  locationElement.innerHTML = `${region},${city}, ${postalCode}`;

  let timezoneElement = document.querySelector("#timezone");
  timezoneElement.innerHTML = response.data.location.timezone;

  let ispElement = document.querySelector("#isp");
  ispElement.innerHTML = response.data.isp;

  // generate the map - Leaflet JS - OpenStreetMap
  var map = L.map("map").setView(
    [response.data.location.lat, response.data.location.lng],
    13
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map); // call the code

  // marker
  var marker = L.marker([
    response.data.location.lat,
    response.data.location.lng,
  ]).addTo(map);
}
// call the IP Address locations
function showIpLocation(ipAddress) {
  let apiKey = "at_Gg1WndHNKZBjaRtsRDEhzHEPnL7Ms";
  let apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  axios.get(apiUrl).then(searchIpAddress);
}
