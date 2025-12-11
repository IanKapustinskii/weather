# Weather App

A responsive weather application with city search and customizable units for temperature, precipitation, wind, and time.

## Features

- **City Search**: Find the weather for any city worldwide.
- **Unit Conversion**: Switch between metric and imperial systems:
  - Temperature (°C / °F)
  - Precipitation (mm / in)
  - Wind speed (m/s / mph)
  - Time format (24h / 12h)
- **Custom Unit Settings**: Set units individually for each parameter.
- **Responsive Design**: Works on desktop, tablet, and mobile devices.
- **Live Data**: Fetches weather information from:
  - [Open-Meteo](https://open-meteo.com/) API for forecasts
  - Geocoding API for city search
- **Interactive UI** built with React for fast and smooth updates.

## Technologies Used

- React + TypeScript  
- Vite for bundling and development  
- Open-Meteo API  
- CSS for styling and responsive design  

## Usage

### Searching for a city

1. Enter the city name in the search input.
2. Select the desired city from the suggestions.
3. The current weather and forecast will update automatically.

### Switching units

- Global switch: Change between metric and imperial units for all measurements at once.
- Individual unit switches: Customize units for temperature, precipitation, wind, and time separately.

### Viewing weather details

- Current temperature, precipitation, wind speed, and time
- Daily and hourly forecasts
- Updates dynamically based on selected units and location

### Deployment

- The project is hosted on GitHub Pages: https://iankapustinskii.github.io/weather/

### Available Languages:
[English](README.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)


---

## Installation

```bash
git clone https://github.com/IanKapustinskii/weather.git
cd weather
npm install
npm run dev