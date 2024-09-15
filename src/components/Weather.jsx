import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import broken_clouds_icon from '../assets/images/broken clouds.png'
import clear_sky_icon from '../assets/images/clear sky.png'
import clear_sky_n_icon from '../assets/images/clear sky n.png'
import few_clouds_icon from '../assets/images/few clouds.png'
import few_clouds_n_icon from '../assets/images/few clouds n.png'
import humidity_icon from '../assets/images/humidity.png'
import mist_icon from '../assets/images/mist.png'
import rain_icon from '../assets/images/rain.png'
import rain_n_icon from '../assets/images/rain n.png'
import scattered_clouds_icon from '../assets/images/scattered clouds.png'
import search_icon from '../assets/images/search.png'
import shower_rain_icon from '../assets/images/shower rain.png'
import snow_icon from '../assets/images/snow.png'
import thunderstorm_icon from '../assets/images/thunderstorm.png'
import wind_icon from '../assets/images/wind.png'

const Weather = () => {

    

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d":clear_sky_icon,
        "01n":clear_sky_n_icon,
        "02d":few_clouds_icon,
        "02n":few_clouds_n_icon,
        "03d":scattered_clouds_icon,
        "03n":scattered_clouds_icon,
        "04d":broken_clouds_icon,
        "04n":broken_clouds_icon,
        "09d":shower_rain_icon,
        "09n":shower_rain_icon,
        "10d":rain_icon,
        "10n":rain_n_icon,
        "11d":thunderstorm_icon,
        "11n":thunderstorm_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        "50d":mist_icon,
        "50n":mist_icon,
    }

    const search = async(city)=>{
       if (city === "") {
        alert("Enter City Name");
        return;
       }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();


            if (!response.ok) {
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_sky_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            
        } catch (error) {
            setWeatherData(false)
            console.log("Error Fetching Weather Data");
            
        }
    }
  
    useEffect(()=>{
        search("Dubai");
    },[])

    return (
    <div className='weather'>
        <div className="search-box">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
    
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>
        }
    </div>
  )
}

export default Weather