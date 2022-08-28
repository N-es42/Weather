key2 = "cf55a09dc7c247e3977fd9a3607bfdce";
const url2 = "https://api.weatherbit.io/v2.0/forecast/daily?";
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
  let dailyQuery = `${url2}city=${cityname}&lang=tr&days=5&key=${key2}`;
  console.log(dailyQuery);
  fetch(dailyQuery)
    .then((response) => response.json())
    .then((response) => dailyYazdir(response));
};

const dailyYazdir = (response) => {
  let gunler=[]
  let temps =[]
  let descs=[]
  let icons =[]
  for (let i = 0; i < 5; i++) {
    var iconUrl;
    var icon;
    first = response["data"][i].temp;
    firstDate = response["data"][i].moonrise_ts;
    temps.push(Math.round(first))
    

    let unix_timestamp = firstDate;
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDay();
    gunler.push(days[day])

    var desc = response["data"][i].weather.description
    descs.push(desc)

    icon = response["data"][i].weather.icon
    iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`
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
const firstLoad2 = () =>{
    let query= `${url2}city=Konya&lang=tr&units=M&days=5&key=${key2}`
    fetch(query)
    .then((response) => response.json())
    .then((response) =>dailyYazdir(response))
}
firstLoad2()


function getLocation2() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.warn("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  // console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

  let geoQuery= `${url2}lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=tr&days=5&key=${key2}`
  fetch(geoQuery)
    .then((response) => response.json())
    .then((response) => dailyYazdir(response));
}

getLocation2()