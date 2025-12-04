import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { type FC } from 'react';
import './DetailsWeather.css'
import { useUnits } from '../UnitsProvider/UnitsProvider';
import { precipitationSymbols, temperatureSymbols, windSymbols } from '../../constants/UnitsLabel';

export interface WeatherDetailsProps {
    weatherData?: WeatherApiResponse;
}



export const DetailsWeather: FC<WeatherDetailsProps> = ({ weatherData}) => {

    const { units } = useUnits();

    let apparentTemperature: string | number = "—";
    let humidity: string | number = "—";
    let wind: string | number = "—";
    let precipitation: string | number = "—";

    if (weatherData) {
        const current = weatherData.current();
        if (current) {
            apparentTemperature = Math.round(current.variables(3)!.value());
            humidity = Math.round(current.variables(4)!.value());
            wind = Math.round(current.variables(6)!.value());
            precipitation = Math.round(current.variables(5)!.value());
        }
    }

    return (
        <ul className='list-reset weather-details__list flex'>
            <li className='weather-details__item flex'>
                <h2 className='weather-details__title title'>Feels like</h2>
                <span className='weather-details__info'>
                    {apparentTemperature} {temperatureSymbols[units.temperature]}
                </span>
            </li>
            <li className='weather-details__item flex'>
                <h2 className='weather-details__title title'>Humidity</h2>
                <span className='weather-details__info'>
                    {humidity}%
                </span>
            </li>
            <li className='weather-details__item flex'>
                <h2 className='weather-details__title title'>Wind</h2>
                <span className='weather-details__info'>
                    {wind} {windSymbols[units.wind]}
                </span>
            </li>
            <li className='weather-details__item flex'>
                <h2 className='weather-details__title title'>Precipitation</h2>
                <span className='weather-details__info'>
                    {precipitation} {precipitationSymbols[units.precipitation]}
                </span>
            </li>
        </ul>
    )
}