import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { ForecastData } from '../../types/weather';
import ForecastDay from './ForecastDay';

const groupForecastByDay = (forecastItems: ForecastData['list']) => {
  const days = new Map<string, ForecastData['list']>();
  forecastItems.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = format(date, 'dd/MM/yyyy');
    const currentItems = days.get(dayKey) || [];
    days.set(dayKey, [...currentItems, item]);
  });
  return days;
};

const Forecast: React.FC<{ forecast: ForecastData }> = ({ forecast }) => {
  const groupedByDay = useMemo(() => groupForecastByDay(forecast.list), [forecast]);

  return (
    <div className="grid gap-3 sm:gap-4 p-2 sm:p-4 border bg-white rounded-xl shadow-lg">
      {[...groupedByDay].map(([day, items]) => (
        <ForecastDay key={day} day={day} items={items} />
      ))}
    </div>
  );
};

export default Forecast;