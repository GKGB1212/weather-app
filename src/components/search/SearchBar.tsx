import React, { useState, useContext, useEffect, useRef } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchCurrentWeatherByCoords,
  fetchForecastByCoords,
} from '../../api/weatherApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuggestionList from './SuggestionList';
import { Suggestion } from '../../types/weather';


const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const context = useContext(WeatherContext);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLDivElement>(null);

  if (!context) throw new Error('WeatherContext not found');

  const { setWeatherData, clearError, setError } = context;

  const fetchWeatherData = async (cityName: string, lat?: number, lon?: number) => {
    try {
      const [weather, forecast] = lat && lon
        ? await Promise.all([fetchCurrentWeatherByCoords(lat, lon), fetchForecastByCoords(lat, lon)])
        : await Promise.all([fetchCurrentWeather(cityName), fetchForecast(cityName)]);
      setWeatherData(weather, forecast, cityName);
      navigate('/');
    } catch (error) {
      setError(lat && lon ? 'Failed to fetch weather data for this city' : 'Invalid country or city');
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (city.trim()) fetchWeatherData(city);
    setCity('');
  };

  const handleSelect = (suggestion: Suggestion) => {
    setCity(suggestion.display);
    setSuggestions([]);
    fetchWeatherData(suggestion.name, suggestion.lat, suggestion.lon);
  };

  const fetchSuggestions = async () => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
      );
      const cities = response.data.map((city: any) => ({
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        display: `${city.name}, ${city.country}`,
      }));
      setSuggestions(cities);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto mb-3 sm:mb-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div ref={inputRef} className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search country or city..."
            className="w-full p-1 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm sm:text-base"
          />
          <SuggestionList suggestions={suggestions} onSelect={handleSelect} />
        </div>
        <button
          type="submit"
          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;