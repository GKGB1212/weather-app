import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/search/SearchBar';
import SearchHistory from '../components/search/SearchHistory';

const Search: React.FC = () => {
  const context = useContext(WeatherContext);

  if (!context) throw new Error('WeatherContext not found');

  const { error } = context;

  return (
    <div className="max-w-lg mx-auto p-4">
      <SearchBar />
      {error && <ErrorMessage message={error} />}
      <SearchHistory />
    </div>
  );
};

export default Search;