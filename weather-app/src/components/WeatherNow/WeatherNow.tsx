import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { type FC } from 'react';
import { WeatherIcon } from '../CityWeather/CityWeatherIcon';
import type { City } from '../../api/CityName';
import { useUnits } from '../UnitsProvider/UnitsProvider';
import { temperatureSymbols } from '../../constants/UnitsLabel';

export interface WeatherNowProps {
    cityData: City;
    weatherData?: WeatherApiResponse;
}

export const WeatherNow: FC<WeatherNowProps> = ({ cityData, weatherData }) => {
    const { units } = useUnits();


    let formattedDate = "Местоположение не определено";
    let temperatureNow: number | string = "—";
    let isDay: number | null = null;
    let weatherCode: number | null = null;

    if (weatherData) {
        const current = weatherData.current();
        if (current) {
            const time = new Date((Number(current.time()) + weatherData.utcOffsetSeconds()) * 1000);
            isDay = current.variables(0)!.value();
            weatherCode = current.variables(1)!.value();
            temperatureNow = Math.round(current.variables(2)!.value());

            formattedDate = time.toLocaleDateString("en-EN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }
    }

    return (
        <div className="flex country__container">
            <div className='flex country__details'>
                <h2 className='title country__title'>
                    {cityData.name}, {cityData.country}
                </h2>
                <span className='country__date'>{formattedDate}</span>
            </div>
            <div className='country__weather flex'>
                {isDay !== null && weatherCode !== null && (
                    <WeatherIcon code={weatherCode} isDay={isDay} />
                )}
                <span>{ temperatureNow} {temperatureSymbols[units.temperature]} </span>
            </div>
        </div>
    );
}