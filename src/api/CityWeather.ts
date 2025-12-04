import { useQuery } from '@tanstack/react-query';
import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { fetchWeatherApi } from 'openmeteo';

export type WeatherParams = {
    latitude: number | null;
    longitude: number | null;
    [key: string]: unknown; 
};


interface RequestWeatherState {
    status: 'idle' | 'pending' | 'success' | 'error';
    data?: WeatherApiResponse;
    error?: unknown;
}

export function UseFetchWeather(
    url: string,
    params:WeatherParams,
) {
    const enabled = Boolean(params.latitude && params.longitude);
    const query = useQuery({
        queryKey: ['weather', url, params.latitude, params.longitude, params.temperature_unit, params.wind_speed_unit, params.precipitation_unit],
        queryFn: async () => {
                const data = await fetchWeatherApi(url, params);
                       return data[0]
            },
            enabled,
        },
    );

    const weatherState: RequestWeatherState = {
        status: query.isLoading
            ? 'pending'
            : query.isError
                ? 'error'
                : query.isSuccess
                    ? 'success'
                    : 'idle',
        data: query.data,
        error: query.error,
    };

    const weatherRefetch = () => query.refetch();

    return {
        weatherState,
        weatherRefetch,
    };
}