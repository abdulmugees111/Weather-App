"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faSun, faCloud, faSearch, faMapMarkerAlt, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

const WeatherApp: React.FC = () => {
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element | null>(null);
  const [weatherImage, setWeatherImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(); 
  const [errorMsg, setErrorMsg] = useState<any>(); 

  const apiKey = 'e25238db0d8d433a8ac175324231508';

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setErrorMsg("This Is Not Present In This API")
    }
  };

  useEffect(() => {
    if (weatherData) {
      const conditionText = weatherData.current.condition.text.toLowerCase();
      
      if (conditionText.includes('rainy') || conditionText.includes('rain')) {
        setWeatherImage('bg-rainy');
        setWeatherIcon(<FontAwesomeIcon icon={faCloudRain} />);
      } else if (conditionText.includes('sunny')) {
        setWeatherImage('bg-sunny');
        setWeatherIcon(<FontAwesomeIcon icon={faSun} />);
      } else if (conditionText.includes('cloudy')) {
        setWeatherImage('bg-cloud');
        setWeatherIcon(<FontAwesomeIcon icon={faCloud} />);
      }
    }
  }, [weatherData]);


  return (
    <>
      <div>
        <div className='text-5xl font-semibold mb-5 text-white font-bold'>Weather App</div>
        <div className='mainDIv'>
          <input
            style={{ width: "85% " }}
            type="text"
            placeholder="Enter city or country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
          className='ml-2'
            style={{ width: "15%" }}
            onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        {weatherData && (
          <div className={`p-4 border rounded-md shadow-md mt-5 ${weatherImage} h-96`}>
            <div className="text-3xl font-semibold mb-2 mt-5" > {weatherData.location.country}</div>
            <div className="text-2xl font-semibold mb-2 mt-5" >Weather in <FontAwesomeIcon icon={faMapMarkerAlt} /> {weatherData.location.name}</div>
            <div className="items-center mt-5">
              <div className="text-2xl font-bold mt-5">Temperature: <FontAwesomeIcon icon={faTemperatureHigh} /> {weatherData.current.temp_c}°C</div>
              <div className="text-2xl mt-5 font-bold">Condition: {weatherIcon}{weatherData.current.condition.text}</div>
            </div>
          </div>
        )}
        {errorMsg && ( <div className='text-2xl font-semibold mt-9 text-white font-bold'>{errorMsg}</div>)}
      </div>
    </>
  );
};

export default WeatherApp;
