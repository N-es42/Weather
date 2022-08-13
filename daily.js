key2 = "db8ed040e1a74021bdaae9521e19f927";
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

const getResultDaily = (cityname) => {
  let dailyQuery = `${url2}city=${cityname}&lang=tr&days=5&key=${key2}`;
  fetch(dailyQuery)
    .then((response) => response.json())
    .then((response) => dailyYazdir(response));
};

const dailyYazdir = (response) => {
  let gunler=[]
  let temps =[]
  let descs=[]
  for (let i = 0; i < 5; i++) {
    first = response["data"][i].temp;
    firstDate = response["data"][i].moonrise_ts;
    temps.push(Math.round(first))


    let unix_timestamp = firstDate;
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDay();
    gunler.push(days[day])

    var desc = response["data"][i].weather.description
    descs.push(desc)
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