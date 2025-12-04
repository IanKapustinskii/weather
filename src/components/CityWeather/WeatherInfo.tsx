import { DaylyWeather } from "../DailyWeather/DailyWeather";
import { DetailsWeather } from "../DetailsWeather/DetailsWeather";
import { HourlyWeather } from "../HourlyWeather/HourlyWeather";
import { WeatherNow } from "../WeatherNow/WeatherNow";
import type { FC } from "react";
import { UseFetchWeather, type WeatherParams } from "../../api/CityWeather";
import { Loader } from "../Loader/Loader";
import type { RequestCityState } from "../../api/CityName";

export interface WeatherInfoProps {
    cityName: RequestCityState;
    urlWeather: string;
    params: WeatherParams;
}


export const WeatherInfo: FC<WeatherInfoProps> = ({cityName, urlWeather, params}) => {

    const { weatherState, weatherRefetch } = UseFetchWeather(urlWeather, params);

    switch (weatherState.status) {
        case "pending":
            return <Loader />;

        case "success":
            if (!weatherState.data) {
                return (
                    <div className='flex error__container'>
                        <span>Error</span>

                        <button className='btn-reset error__btn' onClick={weatherRefetch}>Repeat</button>
                    </div>
                );
            }

            return (
                <section className='flex weather' style={{ position: 'relative' }}>
                    <div className='weather-now__container flex'>
                        <WeatherNow
                            cityData={cityName.data!}
                            weatherData={weatherState.data}
                        />
                        <DetailsWeather
                            weatherData={weatherState.data}
                        />

                        <h2 className='title weather-now__title'>Daily forecast</h2>

                        <DaylyWeather
                            weatherData={weatherState.data}
                        />

                    </div>
                    <HourlyWeather weatherData={weatherState.data} />

                </section>
            );

        case "error":
            return (
                <div className='flex error__container'>
                    <span>Error</span>

                    <button className='btn-reset error__btn' onClick={weatherRefetch}>Repeat</button>
                </div>
            );
    }
}