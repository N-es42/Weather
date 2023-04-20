const key2 = "8W6ZHN4UJA35WE56NAWWUDV3V";
const url2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Konya?unitGroup=metric&include=days&key=8W6ZHN4UJA35WE56NAWWUDV3V&contentType=json
const days = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];
const weatherQuery2 = (e) => {
  if (e.keyCode == "13") {
    getResultDaily(inputElement2.value);
  }
};

const inputElement2 = document.getElementById("sehir");
inputElement2.addEventListener("keypress", weatherQuery2);
const ara2 = document.getElementById("ara");

ara2.addEventListener("click",() =>getResultDaily(inputElement2.value))



const getResultDaily = (cityname) => {
  let dailyQuery = `${url2}${cityname}?unitGroup=metric&include=days&key=${key2}&contentType=json&lang=tr&iconSet=icons2`;
  console.log(dailyQuery);
  fetch(dailyQuery)
    .then((response) => response.json())
    .then((response) => dailyYazdir(response));
};

const dailyYazdir = (response) => {
  // console.log("calıstı");
  let gunler=[]
  let temps =[]
  let descs=[]
  let icons =[]
  // console.log(response);
  for (let i = 0; i < 5; i++) {

    // console.log(response.days[i]);
    var iconUrl;
    var icon;
    first = response.days[i].tempmax
    temps.push(Math.round(first))
    
    firstDate = response.days[i].datetimeEpoch
    let unix_timestamp = firstDate * 1000;
    var date = new Date(unix_timestamp);
    var day = date.getDay();
    gunler.push(days[day])

    var desc = response.days[i].conditions
    descs.push(desc)

    icon = response.days[i].icon
    iconUrl = `w-icons/WeatherIcons/SVG/2nd Set - Color/${icon}.svg`
    icons.push(iconUrl)


  }
  
  gunDizisi = []
  for (let j = 1; j < 6; j++) {
    var hangi=`gun${j}`
    var elaman = document.getElementById(hangi)
    elaman.innerHTML=gunler[j-1]
    var temp= `temp${j}`
    var temEl = document.getElementById(temp)
    temEl.innerHTML= temps[j-1]+"°"

    var desc2= `desc${j}`
    var descEleman =document.getElementById(desc2)
    descEleman.innerHTML= descs[j-1]

    var iconID= `icon${j}`
    var iconEl = document.getElementById(iconID)
    iconEl.src= icons[j-1]
  }
  document.getElementById("gun1").innerHTML="Bugün"
};
const firstLoad2 = (sehir) =>{
    console.log("test");
    let query= `${url2}${sehir}?unitGroup=metric&include=days&key=${key2}&contentType=json&lang=tr&iconSet=icons2`
    fetch(query)
    .then((response) => response.json())
    .then((response) =>dailyYazdir(response))
}



// function getLocation2() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition2);
//   } else { 
//     console.warn("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition2(position) {
//   // console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

//   let geoQuery= `${url2}lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=tr&days=5&key=${key2}`
//   fetch(geoQuery)
//     .then((response) => response.json())
//     .then((response) => dailyYazdir(response));
// }






// getLocation2()