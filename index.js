// Get an api key from https://openweathermap.org/api and replace your key with the underlying key.
const key = "158cf5f66092427595ff814c2a036b57"; //
const url = "https://api.openweathermap.org/data/2.5/";

const weatherQuery = (e) => {
  if (e.keyCode == "13") {
    getResult(inputElement.value);
    // getDaily(inputElement.value)
  }
};
// const yazdirDaily = (response) => {
//     //console.log(response)
// }

const yazdir = (response) => {
  // console.log(response)
  if (response.cod == "404") {
    console.log("bad");
  } else {
    // acıklama
    description = response.weather[0].description;
    const desc = document.getElementsByClassName("desc")[0];
    desc.innerHTML = description;
    //sehir ulke
    const cityName = response.name;
    const country = response.sys.country;
    const city = `${cityName}, ${country}`;
    const cityEl = document.getElementsByClassName("city")[0];
    cityEl.innerHTML = city;
    // sicaklik
    const temp = Math.round(response.main.temp);
    const tempEl = document.getElementsByClassName("temp")[0];
    tempEl.innerHTML = `${temp}°`;
    // min max
    const min = Math.round(response.main.temp_min);
    const max = Math.round(response.main.temp_max);
    const minmaxEl = document.getElementsByClassName("minmax")[0];
    minmaxEl.innerHTML = `${min}° / ${max}°`;
  }
};
// current
const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&lang=tr&units=metric`;
  // console.log(query);
  fetch(query)
    .then((response) => response.json())
    .then((response) => yazdir(response));
};

//daily
// const getDaily = (cityName) => {
//     let query= `${url}forecast/daily?q=${cityName}&appid=${key}&lang=tr&units=metric&cnt=5`
//     console.log(query)
//     fetch(query)
//     .then((response) => response.json())
//     .then((response) =>yazdirDaily(response))

// }

const inputElement = document.getElementById("sehir");
inputElement.addEventListener("keypress", weatherQuery);

const ara = document.getElementById("ara");
ara.addEventListener("click", ()=>getResult(inputElement.value));


const firstLoad = () => {
  let query = `${url}weather?q=konya&appid=${key}&lang=tr&units=metric`;
  fetch(query)
    .then((response) => response.json())
    .then((response) => yazdir(response));
};
firstLoad();
// const rastSayi = Math.floor(Math.random() * 8) + 1;
// const imgUrl = `bg${rastSayi}.jpg`;

// window.addEventListener("load", function () {
//   document.getElementById(
//     "body"
//   ).style.backgroundImage = `url('assets/${imgUrl}')`;
// });

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.warn("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

  let geoQuery= `${url}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&lang=tr&units=metric`
  fetch(geoQuery)
    .then((response) => response.json())
    .then((response) => yazdir(response));
}

getLocation()
