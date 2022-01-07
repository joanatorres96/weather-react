import React, { useState } from "react";
import axios from "axios";
import './Weather.css';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Weather() {
  let [city, setCity] = useState(null);
  let [showInfo, setshowInfo] = useState(null);

  function updateInfo(event) {
    setCity(event.target.value);
  }

  function showCity(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfe2f28f38a462ece1d27d383dea4139&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function showWeather(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    let icon = response.data.weather[0].icon;
    setshowInfo(
      <div>
        <h2>{`${city} ${temperature}ºC`}</h2>
        <div className="info">
        <div className="row">
        <div className="col-sm">
            <ul className="text-decoration-none">
          <li>{`Description: ${description}`}</li>
          <li>{`Humidity: ${humidity}%`}</li>
          <li>{`Wind Speed: ${windSpeed} Km/h`}</li>
          </ul>
          </div>
          <div className="col-sm" id="icon">
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          </div>
          </div>
      </div>
      </div>
    );
  }

  return (
    <div className="Weather">
      <form className="Form" onSubmit={showCity}>
        <input type="text" placeholder="Insert city" className="searchTab" onChange={updateInfo} />
        <input type="submit" value="Search" className="searchButton" />
      </form>
      <p>{showInfo}</p>
    </div>
  );
}