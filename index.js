// Get an api key from https://openweathermap.org/api and replace your key with the underlying key.
key="805eacfcf2e7a1feed74909515ec05d9" // 
const url ="https://api.openweathermap.org/data/2.5/"


const weatherQuery = (e) => {
    if(e.keyCode=='13'){
        getResult(inputElement.value)
    }
}

const yazdir = (response) => {
    // acıklama
    description=response.weather[0].description
    const desc= document.getElementsByClassName("desc")[0]
    desc.innerHTML=description
    //sehir ulke
    const cityName= response.name
    const country=response.sys.country
    const city = `${cityName}, ${country}`
    const cityEl= document.getElementsByClassName("city")[0]
    cityEl.innerHTML=city
    // sicaklik
    const temp = Math.round(response.main.temp)
    const tempEl= document.getElementsByClassName("temp")[0]
    tempEl.innerHTML=`${temp}°`
    // min max
    const min = Math.round(response.main.temp_min)
    const max = Math.round(response.main.temp_max)
    const minmaxEl= document.getElementsByClassName("minmax")[0]
    minmaxEl.innerHTML=`${min}° / ${max}°`

      
}

const getResult = (cityName) => {
    let query= `${url}weather?q=${cityName}&appid=${key}&lang=tr&units=metric`
    fetch(query)
    .then((response) => response.json())
    .then((response) =>yazdir(response))
    
}

const inputElement = document.getElementById("sehir")
inputElement.addEventListener("keypress",weatherQuery)

const firstLoad = () =>{
    let query= `${url}weather?q=konya&appid=${key}&lang=tr&units=metric`
    fetch(query)
    .then((response) => response.json())
    .then((response) =>yazdir(response))
}
firstLoad()