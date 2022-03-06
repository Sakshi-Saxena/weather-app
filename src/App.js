import React, { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);
            
            setWeather(data);
            setQuery('');
        }
    }
    console.log(weather);

    return (
        <div className="main-container">
            <div className='inputdiv'>
                <AiOutlineSearch style={{fontSize: "20px",opacity: ".5px", marginRight: "12px"}}></AiOutlineSearch>
                <input type="text"className="search"placeholder="Enter City.."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search} />
            </div>
           
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span style={{letterSpacing: "5px", textTransform: "uppercase"}}>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>

                    <div className='footer-info'style={{opacity: "0.7"}}>
                        <h3 className='rows' style={{letterSpacing: "2px"}}>Humidity
                            <span> {Math.round(weather.main.humidity)} % </span>
                        </h3>
                        <h3 className='rows'  style={{letterSpacing: "2px"}}>Pressure
                            <span> {Math.round(weather.main.pressure)} Pa</span>
                        </h3>
                        <h3 className='rows'  style={{letterSpacing: "2px"}}>Sunrise (IST)
                            <span> {new Date((weather.sys.sunrise)*1000).toLocaleTimeString([], {timeStyle: 'short'})} </span>
                        </h3>
                        <h3 className='rows'  style={{letterSpacing: "2px"}}>Sunset (IST)
                            <span> {new Date((weather.sys.sunset)*1000).toLocaleTimeString([], {timeStyle: 'short'})} </span>
                        </h3>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default App;