import React from 'react';
import { format } from 'date-fns';
import { WeatherData } from '../../types/weather';
import WeatherDetail from './WeatherDetail';


const CurrentWeather: React.FC<{ weather: WeatherData }> = ({ weather }) => {
  const date = format(new Date(weather.dt * 1000), 'MMMM dd, yyyy');
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white border rounded-xl p-3 sm:p-4 md:p-5 shadow-lg mb-2 sm:mb-4 space-y-4">
      <h2 className="text-base sm:text-xl">{date}</h2>
      <div className="flex items-center justify-around gap-2 sm:gap-4">
        <img
          src={iconUrl}
          alt="Weather icon"
          className="w-16 sm:w-20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-3xl sm:text-5xl font-semibold">{Math.round(weather.main.temp)}°C</h3>
          <p className="capitalize text-base sm:text-xl">{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="flex justify-around items-center mt-2 sm:mt-4 gap-2 sm:gap-4">
        <WeatherDetail label="Humidity" value={weather.main.humidity} unit="%" />
        <WeatherDetail label="Wind" value={weather.wind.speed} unit="m/s" windDeg={weather.wind.deg}/>
        <WeatherDetail label="Visibility" value={weather.visibility / 1000} unit="km" />
      </div>
    </div>
  );
};

export default CurrentWeather;