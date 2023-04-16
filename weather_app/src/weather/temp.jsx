import React, { useState, useEffect } from "react";
import WeatherCard from "./weatherCard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ddcdc9daf36ba40a970cd669d27242c8`;
      const res = await fetch(url);
      const data = await res.json();
      const { main: weathermood } = data.weather[0];
      const { temp, pressure, humidity } = data.main;
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      console.log({ temp });
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search .."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>
        <WeatherCard  tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
