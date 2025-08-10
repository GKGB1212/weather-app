import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
};

export default App;