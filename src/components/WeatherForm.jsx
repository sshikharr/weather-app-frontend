import React from 'react';

function WeatherForm({ city, setCity, fetchWeather, error }) {
  // Handling Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchWeather(e);
    setCity(''); 
  };
  return (
    <div className="bg-white p-6 rounded shadow-md mb-8">
      <form onSubmit={onSubmit} className="flex">
        <input 
          type="text" 
          placeholder="Enter city name" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          required 
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Search Weather
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default WeatherForm;