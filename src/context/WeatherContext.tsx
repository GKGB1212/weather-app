import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import CryptoJS from 'crypto-js';
import { WeatherData, ForecastData, HistoryItem } from '../types/weather';
import {
    fetchCurrentWeather,
    fetchForecast,
    fetchCurrentWeatherByCoords,
    fetchForecastByCoords,
} from '../api/weatherApi';

interface WeatherContextType {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    history: HistoryItem[];
    error: string | null;
    isLoading: boolean;
    setWeatherData: (weather: WeatherData, forecast: ForecastData, city?: string) => void;
    addSearchHistory: (name: string, lat: number, lon: number) => void;
    deleteSearchHistory: (city: string) => void;
    clearError: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load weather based on user location or fallback to VietNam
    useEffect(() => {
        const loadWeather = async () => {
            setIsLoading(true);
            try {
                if (navigator.geolocation) {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { latitude, longitude } = position.coords;
                    const [weatherData, forecastData] = await Promise.all([
                        fetchCurrentWeatherByCoords(latitude, longitude),
                        fetchForecastByCoords(latitude, longitude),
                    ]);
                    setWeather(weatherData);
                    setForecast(forecastData);
                    addSearchHistory(weatherData.name, latitude, longitude);
                } else {
                    throw new Error('Geolocation not supported');
                }
            } catch (err) {
                try {
                    const [weatherData, forecastData] = await Promise.all([
                        fetchCurrentWeather('Hanoi'),
                        fetchForecast('Hanoi'),
                    ]);
                    setWeather(weatherData);
                    setForecast(forecastData);
                    addSearchHistory('Hanoi', weatherData.coord.lat, weatherData.coord.lon);
                } catch (fallbackErr) {
                    setError('Failed to load weather data');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (!weather && !forecast) {
            loadWeather();
        }
    }, [weather, forecast]);

    // Load history from localStorage
    useEffect(() => {
        const encrypted = localStorage.getItem('searchHistory');
        if (encrypted) {
            try {
                const decrypted = CryptoJS.AES.decrypt(encrypted, 'secret-key').toString(CryptoJS.enc.Utf8);
                setHistory(JSON.parse(decrypted));
            } catch (err) {
                console.error('Failed to decrypt search history:', err);
            }
        }
    }, []);

    // Save history to localStorage
    const saveHistory = (newHistory: HistoryItem[]) => {
        try {
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(newHistory), 'secret-key').toString();
            localStorage.setItem('searchHistory', encrypted);
            setHistory(newHistory);
        } catch (err) {
            console.error('Failed to save search history:', err);
        }
    };

    const setWeatherData = (weather: WeatherData, forecast: ForecastData, city?: string, lat?: number, lon?: number) => {
        setWeather(weather);
        setForecast(forecast);
        if (city) {
          const latToSave = lat || weather.coord?.lat || 0;
          const lonToSave = lon || weather.coord?.lon || 0;
          addSearchHistory(city, latToSave, lonToSave);
        }
      };

      const addSearchHistory = (name: string, lat: number, lon: number) => {
        const newHistory = [{ name, lat, lon }, ...history.filter((h) => h.name !== name)].slice(0, 10);
        saveHistory(newHistory);
      };

    const deleteSearchHistory = (city: string) => {
        const newHistory = history.filter((h) => h.name !== city);
        saveHistory(newHistory);
    };

    const clearError = () => setError(null);

    return (
        <WeatherContext.Provider
            value={{
                weather,
                forecast,
                history,
                error,
                setError,
                isLoading,
                setWeatherData,
                addSearchHistory,
                deleteSearchHistory,
                clearError,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};