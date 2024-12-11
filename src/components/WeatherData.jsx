import React from 'react';

function WeatherData({ weatherData }) {
  return (
    <div className="bg-white p-6 rounded shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Weather in {weatherData.location.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Temperature:</strong> {weatherData.current.temperature}°C</p>
          <p><strong>Feels Like:</strong> {weatherData.current.feelslike}°C</p>
          <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
        </div>
        <div>
          <p><strong>Wind Speed:</strong> {weatherData.current.wind_speed} km/h</p>
          <p><strong>Conditions:</strong> {weatherData.current.weather_descriptions[0]}</p>
          <img 
            src={weatherData.current.weather_icons[0]} 
            alt="Weather Icon" 
            className="w-20 h-20"
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherData;