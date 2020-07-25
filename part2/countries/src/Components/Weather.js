import React,{useState,useEffect} from "react";
import axios from "axios"

const Weather=({name})=>{
 const [weather,setWeather]=useState();
   const api_key = process.env.REACT_APP_API_KEY;
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
        .then(data=>{console.log(data.data);setWeather(data.data)})
        .catch(err=>{console.log(err)});
        
    },[name])
  if(weather && weather.success===true)  {
      return <div>
          <h3>Weather in {weather.location.name}  </h3>
      <h4>Temperature:{weather.current.temperature}&#8451;        </h4>
     
         <h4>{weather.current.weather_descriptions[0]}   <img style={{ height: 80, width: 80 }} src={weather.current.weather_icons[0]}/></h4>
        </div>
  }
     return <div>weather api key not specified</div>
    
}

export default Weather