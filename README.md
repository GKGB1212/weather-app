# Weather Application

## Features
- **Real-time Weather**: Displays current temperature (rounded to nearest integer), humidity, wind speed (with dynamic direction arrow), and visibility.
- **Weather Forecast**: Provides multi-day forecasts with daily breakdowns.
- **Search Functionality**: Allows users to search for cities with autocomplete suggestions and maintain a searchable history with latitude/longitude data.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices using Tailwind CSS breakpoints.
- **Local Time Display**: Adjusts time based on the timezone from the API (e.g., UTC+7 for Vietnam).
- **Modular Architecture**: Components like `SearchBar`, `SearchHistory`, `CurrentWeather`, and `Forecast` are organized into subdirectories for maintainability.
- **Visual Enhancements**: Includes drop shadows on weather icons and wind direction arrows using Phosphor Icons.
- **Error Handling**: Displays user-friendly error messages when API calls fail.

## Technologies Used
- **Frontend**: React.js, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API**: Open Weather Map API
- **Utilities**: date-fns for date formatting, @phosphor-icons/react for icons
- **Build Tool**: Vite
- 
## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:GKGB1212/weather-app.git
   cd weather-app
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:
  - Create a .env file in the root directory (do not commit this file to Git).
  - Add your Open Weather Map API key:
    ```bash
    VITE_API_KEY=your_api_key_here
    VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
4. Run the application locally:
    ```bash
    npm run dev
