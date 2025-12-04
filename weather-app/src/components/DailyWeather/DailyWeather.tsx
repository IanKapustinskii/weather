import type { FC } from "react";
import { useUnits } from "../UnitsProvider/UnitsProvider";
import type { WeatherDetailsProps } from "../DetailsWeather/DetailsWeather";
import { WeatherIcon } from "../CityWeather/CityWeatherIcon";
import { temperatureSymbols } from "../../constants/UnitsLabel";
import "./DailyWeather.css"




export const DaylyWeather: FC<WeatherDetailsProps> = ({ weatherData }) => {

    const { units } = useUnits();

    let temperatureMax: string | Array<number> = "—";
    let temperatureMin: string | Array<number> = "—";
    let weekday: string | Array<string> = "—";
    let weatherCode: Array<number> | null = null;

    if (weatherData) {
        const daily = weatherData.daily();
        if (daily) {
            const time = Array.from(
                { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + weatherData.utcOffsetSeconds()) * 1000));
            weekday = time.map((d) =>
                d.toLocaleString("en-EN", {
                    weekday: "short",
                }))

            const rawTemperatureMax = daily.variables(2)!.valuesArray();
            temperatureMax = rawTemperatureMax ? Array.from(rawTemperatureMax) : [];

            const rawTemperatureMin = daily.variables(1)!.valuesArray();
            temperatureMin = rawTemperatureMin ? Array.from(rawTemperatureMin) : [];

            const rawWeatherCode = daily.variables(0)!.valuesArray();
            weatherCode = rawWeatherCode ? Array.from(rawWeatherCode) : [];

        }

    }

    return (
        <ul className="list-reset flex daily-weather__list">
            {weekday !== "—" && Array.isArray(weekday) && Array.isArray(temperatureMax) && Array.isArray(temperatureMin) &&
                weekday.map((day, i) => (
                    <li key={i} className="daily-weather__item flex">
                        <h3 className="daily-weather__title title">{day}</h3>
                        {weatherCode !== null && (
                            <WeatherIcon code={weatherCode[i]}/>
                        )}
                        <div className="daily-weather__temperature flex">
                            <span className="daily-weather__temperature-max">{Math.round(temperatureMax[i])}{temperatureSymbols[units.temperature]}</span>
                            <span className="daily-weather__temperature-min">{Math.round(temperatureMin[i])}{temperatureSymbols[units.temperature]}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )

}