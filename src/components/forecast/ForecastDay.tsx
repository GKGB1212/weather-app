import React from 'react';
import { format } from 'date-fns';
import ForecastItem from './ForecastItem';

interface ForecastDayProps {
  day: string;
  items: Array<{
    dt: number;
    main: { temp_max: number; temp_min: number };
    weather: { icon: string; description: string }[];
  }>;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ day, items }) => {
  const isToday = day === format(new Date(), 'dd/MM/yyyy');
  const displayDate = isToday ? 'Today' : format(new Date(day.split('/').reverse().join('-')), 'dd MMMM');

  return (
    <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
      <h3 className="text-base sm:text-lg text-gray-500">{displayDate}</h3>
      <div className="grid gap-1 sm:gap-2 grid-cols-1 space-y-1 sm:space-y-2">
        {items.map((item) => (
          <ForecastItem key={item.dt} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ForecastDay;