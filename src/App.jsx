import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import WeatherForm from './components/WeatherForm';
import WeatherData from './components/WeatherData';
import SearchHistory from './components/SearchHistory';

function App() {
  // State variables
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [token, setToken] = useState(localStorage.getItem('token')); // JWT token
  const [city, setCity] = useState(''); // City input for weather search
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const [searchHistory, setSearchHistory] = useState([]); // Search history
  const [error, setError] = useState(''); // Error message

  const API_URL = 'https://weather-app-backend-wby9.onrender.com'; // API base URL

  // Handle authentication (login/signup)
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await axios.post(`${API_URL}${endpoint}`, { username, password });
      
      // Store token in local storage and state
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      
      // Switch to login mode after signup
      if (!isLogin) {
        setIsLogin(true);
      }
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  // Fetch weather data
  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/weather/weather-fetch`, 
        { city }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWeatherData(response.data);
      fetchSearchHistory();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Weather fetch failed');
    }
  };

  // Fetch search history
  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/weather/weather-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchHistory(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch search history');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setWeatherData(null);
    setSearchHistory([]);
  };

  // Fetch search history on token change
  useEffect(() => {
    if (token) {
      fetchSearchHistory();
    }
  }, [token]);

  // Render authentication form if not logged in
  if (!token) {
    return (
      <>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Weather App</h1>
        </header>
        <AuthForm 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleAuth={handleAuth}
          error={error}
        />
      </>
    );
  }

  // Render main app if logged in
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Weather App</h1>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <WeatherForm 
          city={city}
          setCity={setCity}
          fetchWeather={fetchWeather}
          error={error}
        />

        {weatherData && <WeatherData weatherData={weatherData} />}

        <SearchHistory searchHistory={searchHistory} />
      </div>
    </div>
  );
}

export default App;