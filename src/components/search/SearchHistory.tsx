import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { fetchCurrentWeatherByCoords, fetchForecastByCoords } from '../../api/weatherApi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HistoryItemRow from './HistoryItemRow';
import { HistoryItem } from '../../types/weather';

const fetchWeatherForItem = async (item: HistoryItem, setWeatherData: (weather: any, forecast: any, city: string) => void, navigate: NavigateFunction, clearError: () => void, setError: (message: string) => void) => {
  clearError();
  try {
    const [weather, forecast] = await Promise.all([
      fetchCurrentWeatherByCoords(item.lat, item.lon),
      fetchForecastByCoords(item.lat, item.lon),
    ]);
    setWeatherData(weather, forecast, item.name);
    navigate('/');
  } catch (error) {
    setError('Failed to fetch weather data for this city');
    console.error('Error fetching weather data:', error);
  }
};

const SearchHistory: React.FC = () => {
  const context = useContext(WeatherContext);
  const navigate = useNavigate();

  if (!context) throw new Error('WeatherContext not found');

  const { history, deleteSearchHistory, setWeatherData, clearError, setError } = context;

  const handleItemClick = (item: HistoryItem) => {
    fetchWeatherForItem(item, setWeatherData, navigate, clearError, setError);
  };

  const handleDelete = (name: string) => {
    deleteSearchHistory(name);
  };

  return (
    <div className="space-y-2 mt-2 sm:mt-4">
      <h3 className="text-base sm:text-lg font-semibold">Search History</h3>
      {history?.length > 0 ? (
        <div className="border p-1 sm:p-2 rounded-xl bg-white shadow-sm py-2">
          <ul className="list-none p-0">
            {history.map((item) => (
              <HistoryItemRow
                key={item.name}
                item={item}
                onClick={handleItemClick}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-base">Start searching to see history here!</p>
      )}
    </div>
  );
};

export default SearchHistory;