import React from 'react';
import { ArrowUp } from '@phosphor-icons/react';

interface WeatherDetailProps {
  label: string;
  value: number;
  unit: string;
  windDeg?: number;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ label, value, unit, windDeg }) => (
  <div className="text-center">
    <p className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-base">{label}</p>
    <p className="font-semibold">
    {windDeg !== undefined && (
        <span
          className="inline-block"
          style={{ transform: `rotate(${windDeg}deg)` }}
        >
          <ArrowUp size={15} weight='bold' />
        </span>
      )}
      <span className="text-base sm:text-lg mr-1">{value}</span>
      <span className="text-xs sm:text-base">{unit}</span>
      
    </p>
  </div>
);
export default WeatherDetail;