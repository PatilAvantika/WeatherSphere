let w_city=document.querySelector(".weather-city");
let w_Time=document.querySelector(".weather-date-time");
let w_forcast=document.querySelector(".weather-main-data");
let w_icon=document.querySelector(".weather-icon");
let w_temp=document.querySelector(".weather-temp");
let w_min=document.querySelector(".weather-min");
let w_max=document.querySelector(".weather-max");
let feels=document.querySelector(".w_feels");
let humid=document.querySelector(".w_humidity");
let w_wind=document.querySelector(".w_winds");
let pressure=document.querySelector(".w_pressure");
let city_search=document.querySelector(".weather-search");
const getcountry=(code)=>{
   return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}
const getdatetime=(dt)=>{
    const date=new Date(dt*100);
    const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
      
    };
    const formatter=new Intl.DateTimeFormat("en-US",options);
    const formattedDate=formatter.format(date);

    return formattedDate;
}
let city="mumbai";
city_search.addEventListener("submit",(e)=>{
  e.preventDefault();
  let city_name=document.querySelector(".city-data");
  city=city_name.value;
  getWeather_data();
  city_name.value="";
});
const getWeather_data=async()=>{
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f70b21d8bb3712af75ce1d5f0d317370`;
  try {
    const res=await fetch(url);
    const data=await res.json();
    const { main,name,weather,wind,sys,dt }=data;
   w_forcast.innerHTML=weather[0].main;
   w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;
    w_city.innerHTML=`${name}, ${getcountry(sys.country)}`  
    w_Time.innerHTML=getdatetime(dt);
    w_temp.innerHTML=`${main.temp}&#176`;
    w_min.innerHTML=`min: ${main.temp_min.toFixed()}&#176`;
    w_max.innerHTML=`max: ${main.temp_max.toFixed()}&#176`;
    feels.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176;C`;
    humid.innerHTML = ` ${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hPa`;
} catch (error) {
    console.log(error);
  }
};
document.body.addEventListener("load",getWeather_data());


