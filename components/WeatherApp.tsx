"use client";
import React, { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faSun,
  faCloud,
  faSearch,
  faMapMarkerAlt,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { fetchWeatherData } from "../api/FetchWeatherData";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store"; // Import your AppDispatch type


const WeatherApp: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [weatherData, setweatherData] = useState<any | null>(null);
  const weatherDatas = useSelector((state: RootState) => state.weather.value);const globalState = useSelector((state: RootState) => state.weather.value);
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element | null>(null);
  const [weatherImage, setWeatherImage] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>();

  const apiKey: any = process.env.NEXT_PUBLIC_API_KEY;

  const handleSearch = () => {
    dispatch(fetchWeather(location));
  };

  useEffect(() => {
    if (weatherDatas) {
    setweatherData(weatherDatas);
  }}, [weatherDatas]);

  useEffect(() => {
    if (weatherData) {
      const conditionText = weatherData?.current?.condition?.text.toLowerCase();

      if (conditionText?.includes("rainy") || conditionText?.includes("rain")) {
        setWeatherImage("bg-rainy");
        setWeatherIcon(<FontAwesomeIcon icon={faCloudRain} />);
      } else if (conditionText?.includes("sunny")) {
        setWeatherImage("bg-sunny");
        setWeatherIcon(<FontAwesomeIcon icon={faSun} />);
      } else if (conditionText?.includes("cloudy")) {
        setWeatherImage("bg-cloud");
        setWeatherIcon(<FontAwesomeIcon icon={faCloud} />);
      } else if (conditionText?.includes("fog")) {
        setWeatherImage("bg-fog");
        setWeatherIcon(<FontAwesomeIcon icon={faCloud} />);
      } else if (conditionText?.includes("mist")) {
        setWeatherImage("bg-fog");
        setWeatherIcon(<FontAwesomeIcon icon={faCloud} />);
      } else if (conditionText?.includes("clear")) {
        setWeatherImage("bg-sunny");
        setWeatherIcon(<FontAwesomeIcon icon={faSun} />);
      }
    }
  }, [weatherData]);

  return (
    <>
      <div>
        <div className="text-5xl font-semibold mb-5 text-white font-bold">
         Weather App
        </div>
        <div className="flex">
          <input
            className=" w-85"
            type="text"
            placeholder="Enter city or country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="ml-2 w-15" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {weatherData && (
          <div
            className={`p-4 border rounded-md shadow-md mt-5 ${weatherImage} h-96`}
          >
            <div className="text-3xl font-semibold mb-2 mt-5">
              {" "}
              {weatherData?.location?.country}
            </div>
            <div className="text-2xl font-semibold mb-2 mt-5">
              Weather in <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              {weatherData?.location?.name}
            </div>
            <div className="items-center mt-5">
              <div className="text-2xl font-bold mt-5">
                Temperature: <FontAwesomeIcon icon={faTemperatureHigh} />{" "}
                {weatherData?.current?.temp_c}°C
              </div>
              <div className="text-2xl mt-5 font-bold">
                Condition: {weatherIcon}
                {weatherData?.current?.condition?.text}
              </div>
            </div>
          </div>
        )}

        {errorMsg && !weatherData && (
          <div className="text-2xl font-semibold mt-9 text-white font-bold">
            {errorMsg}
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
