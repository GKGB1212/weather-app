export interface WeatherData {
    coord: { lat: number; lon: number };
    weather: { id: number; main: string; description: string; icon: string }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    visibility: number;
    wind: { speed: number; deg: number; gust?: number };
    clouds: { all: number };
    dt: number;
    sys: { country: string; sunrise: number; sunset: number };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

export interface ForecastData {
    list: {
        dt: number;
        main: { temp_max: number; temp_min: number };
        weather: { icon: string; description: string }[];
    }[];
}

export interface HistoryItem {
    name: string;
    lat: number;
    lon: number;
}

export interface Suggestion {
    name: string;
    lat: number;
    lon: number;
    display: string;
  }
  