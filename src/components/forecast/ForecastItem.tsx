import React from 'react';
import { format } from 'date-fns';

interface ForecastItemProps {
  dt: number;
  main: { temp_max: number; temp_min: number };
  weather: { icon: string; description: string }[];
}

const ForecastItem: React.FC<ForecastItemProps> = ({ dt, main: { temp_max, temp_min }, weather }) => {
  const time = format(new Date(dt * 1000), 'HH:mm');
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="flex justify-between items-center gap-3 sm:gap-5 p-2 sm:p-0">
      <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5">
        <span className="text-base sm:text-lg font-semibold">{time}</span>
        <img
          src={iconUrl}
          alt={weather[0].description}
          className="w-12 sm:w-16 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
        />
        <span className="text-xs sm:text-sm text-gray-500">
          {temp_max} / {temp_min}°C
        </span>
      </div>
      <span className="font-semibold lowercase text-sm sm:text-base text-right">{weather[0].description}</span>
    </div>
  );
};

export default ForecastItem;