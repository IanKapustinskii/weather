import type { FC } from "react";
import "./HourlyWeather.css";
import type { WeatherDetailsProps } from "../DetailsWeather/DetailsWeather";
import { useUnits } from '../UnitsProvider/UnitsProvider';
import { temperatureSymbols } from '../../constants/UnitsLabel';
import { WeatherIcon } from "../CityWeather/CityWeatherIcon";

export const HourlyWeather: FC<WeatherDetailsProps> = ({ weatherData }) => {

    const { units } = useUnits();

    if (!weatherData) return null;

    const hourly = weatherData.hourly();
    if (!hourly) return null;

    const utcOffsetSeconds = weatherData.utcOffsetSeconds();

    const now = new Date(Date.now() + utcOffsetSeconds * 1000);
    const currentHour = now.getHours();

    const hourlyTimes = Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) =>
            new Date(
                (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000
            )
    );

    const format12 = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: true,
    });

    const hourlyWeather = Array.from(hourly.variables(0)!.valuesArray() ?? []);

    const hourlyCode = Array.from(hourly.variables(1)!.valuesArray() ?? []);

    const hoirlyIsDay = Array.from(hourly.variables(2)!.valuesArray() ?? []);

    const startIndex = hourlyTimes.findIndex(
        (d) => d.getHours() === currentHour
    );

    const safeIndex = startIndex === -1 ? 0 : startIndex;

    const nextHours = hourlyTimes.slice(safeIndex, safeIndex + 24);

    const nextWeather = hourlyWeather.slice(safeIndex, safeIndex + 24);

    const nextCode = hourlyCode.slice(safeIndex, safeIndex + 24);

    const nextIsDay = hoirlyIsDay.slice(safeIndex, safeIndex + 24);


    return (
        <div className="weather-hourly flex">
            <h2 className="weather-hourly__title title">
                Hourly forecast
            </h2>
            <ul className="hourly__list list-reset flex">
                {nextHours.map((d, i) => (
                    <li className="hourly__item flex" key={i}>
                        <div className="hourly__item-icon--time flex">
                        <WeatherIcon code={nextCode[i]} isDay={nextIsDay[i]} />
                        <span className="hourly__item-time">
                            {units.time === "12" ? format12.format(d) : d.getHours() + ":00"}
                        </span>
                        </div>
                        <span className="hourly__item-temperature">
                            {Math.round(nextWeather[i])} {temperatureSymbols[units.temperature]}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )

}