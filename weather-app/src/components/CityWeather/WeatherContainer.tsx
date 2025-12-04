import './WeatherContainer.css';
import { UseCityDisplay } from '../../api/CityName';
import { useUnits } from '../UnitsProvider/UnitsProvider';
import { Loader } from '../Loader/Loader';
import { WeatherInfo } from './WeatherInfo';

// export const FetchCityDisplay = () => {

//     const { units } = useUnits();

//     const city = units.city;

//     const { state, refetch } = UseCityDisplay(`https://geocoding-api.open-meteo.com/v1/get?id=${city}`);

//     const latitude = state.data?.latitude ?? null;
//     const longitude = state.data?.longitude ?? null;

//     const urlWeather = `https://api.open-meteo.com/v1/forecas`;

//     const params = {
//         "latitude": latitude,
//         "longitude": longitude,
//         "daily": ["weather_code", "temperature_2m_min", "temperature_2m_max"],
//         "hourly": ["temperature_2m", "weather_code", "is_day"],
//         "current": ["is_day", "weather_code", "temperature_2m", "apparent_temperature", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
//         "timezone": "auto",
//         "wind_speed_unit": units.wind,
//         "temperature_unit": units.temperature,
//         "precipitation_unit": units.precipitation,
//     };

//     switch (state.status) {
//         case "pending":
//             return <Loader />;

//         case "success":
//             if (!state.data ) {
//                 return (
//                     <div className='flex error__container'>
//                         <span>Error</span>

//                         <button className='btn-reset error__btn' onClick={refetch}>Repeat</button>
//                     </div>
//                 );
//             }

//             return (
//                 <WeatherInfo cityName={state} urlWeather={urlWeather} params={params}/>
//             );

//         case "error":
// return (
//     <div className='flex error__container'>
//         <span>Error</span>

//         <button className='btn-reset error__btn' onClick={refetch}>Repeat</button>
//     </div>
// );
//     }

// }

export const FetchCityDisplay = () => {
    const { units } = useUnits();
    const cityId = units.city;

    const { state, refetch } = UseCityDisplay(
        `https://geocoding-api.open-meteo.com/v1/get?id=${cityId}`
    );

    if (state.status === 'pending') {
        return <Loader />;
    }

    if (state.status === 'error' || !state.data) {
        return (
            <div className='flex error__container'>
                <span>Не удалось найти город</span>
                <button className='btn-reset error__btn' onClick={refetch}>
                    Повторить
                </button>
            </div>
        );
    }
    const { latitude, longitude } = state.data;

    const urlWeather = 'https://api.open-meteo.com/v1/forecast';

    const params = {
        latitude,
        longitude,
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
        hourly: ["temperature_2m", "weather_code", "is_day"],
        current: [
            "is_day",
            "weather_code",
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "precipitation",
            "wind_speed_10m"
        ],
        timezone: "auto",
        wind_speed_unit: units.wind,
        temperature_unit: units.temperature,
        precipitation_unit: units.precipitation,
    };

    return (
        <WeatherInfo
            cityName={state}
            urlWeather={urlWeather}
            params={params}
        />
    );
};