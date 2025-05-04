import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WeatherContext } from '../context/WeatherContext';
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(WeatherContext);

  if (!context) throw new Error('WeatherContext not found');

  const { weather } = context;
  const cityName = weather?.name || 'Weather App';
  return (
    <header className="sticky top-0 z-50 shadow-md bg-white px-2">
      <div className="max-w-[500px] mx-auto py-3 flex justify-between items-center">
        <div className='flex gap-1 items-center'>
        <MapPin size={25}  className='text-gray-500'/><h1 className="text-lg font-semibold md:text-xl">{cityName}</h1></div>
        
        <button
          onClick={() => navigate('/search')}
          className="px-4 py-2 bg-white rounded-md"
        >
          <MagnifyingGlass weight='bold' size={25}/>
        </button>
      </div>
    </header>
  );
};

export default Header;