import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import CurrentWeather from '../components/weather/CurrentWeather';
import Forecast from '../components/forecast/Forecast';
// import Forecast from '../components/Forecast';

const Home: React.FC = () => {
  const context = useContext(WeatherContext);

  if (!context) throw new Error('WeatherContext not found');

  const { weather, forecast, isLoading, error } = context;

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!weather || !forecast) return <p className="text-center text-lg">No data available</p>;

  return (
    <div className="container max-w-[500px] p-4 mx-auto">
      <CurrentWeather weather={weather} />
      <p className='font-semibold mt-4 mb-2'>5-day Forecast (3 Hours)</p>
      <Forecast forecast={forecast} />
    </div>
  );
};

export default Home;