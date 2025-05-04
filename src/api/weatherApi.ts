import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';
import { API_BASE_URL, API_KEY } from '../constants';

const retry = async <T>(fn: () => Promise<T>, retries: number = 2): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw new Error('Invalid city or API error');
      return retry(fn, retries - 1);
    }
  };
export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
        });
        console.log("response",response);
        return response.data;
    } catch (error) {
        throw new Error('Invalid country or city');
    }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecast`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Invalid city or API error');
    }
};

export const fetchCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    return retry(() =>
      axios
        .get(`${API_BASE_URL}/weather`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' },
        })
        .then((response) => response.data)
    );
  };
  
  export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
    return retry(() =>
      axios
        .get(`${API_BASE_URL}/forecast`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' },
        })
        .then((response) => response.data)
    );
  };