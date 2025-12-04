import { type FC } from "react"
import { Icon } from '@iconify/react';
import clearDay from '@iconify-icons/wi/day-sunny';
import clearNight from '@iconify-icons/wi/night-clear';
import partlyCloudyDay from '@iconify-icons/wi/day-cloudy';
import partlyCloudyNight from '@iconify-icons/wi/night-alt-cloudy';
import overcast from '@iconify-icons/wi/cloud';
import fog from '@iconify-icons/wi/fog';
import drizzle from '@iconify-icons/wi/sprinkle';
import drizzleDense from '@iconify-icons/wi/rain';
import rain from '@iconify-icons/wi/showers';
import rainDense from '@iconify-icons/wi/rain';
import sleet from '@iconify-icons/wi/sleet';
import snow from '@iconify-icons/wi/snow';
import snowDense from '@iconify-icons/wi/snow-wind';
import thunderstorm from '@iconify-icons/wi/thunderstorm';
import hail from '@iconify-icons/wi/hail';

interface WeatherIconMapping {
    [key: number]: { day: any; night: any };
}

export interface WeatherIconProps {
    code: number;
    isDay?: number;
}

export const weatherIcons: WeatherIconMapping = {
    // Clear sky
    0: { day: clearDay, night: clearNight },

    // Mainly clear, partly cloudy, overcast
    1: { day: partlyCloudyDay, night: partlyCloudyNight },
    2: { day: partlyCloudyDay, night: partlyCloudyNight },
    3: { day: overcast, night: overcast },

    // Fog
    45: { day: fog, night: fog },
    48: { day: fog, night: fog },

    // Drizzle
    51: { day: drizzle, night: drizzle },
    53: { day: drizzle, night: drizzle },
    55: { day: drizzleDense, night: drizzleDense },

    56: { day: sleet, night: sleet },
    57: { day: sleet, night: sleet },

    // Rain
    61: { day: rain, night: rain },
    63: { day: rain, night: rain },
    65: { day: rainDense, night: rainDense },

    66: { day: sleet, night: sleet },
    67: { day: sleet, night: sleet },

    // Snow
    71: { day: snow, night: snow },
    73: { day: snow, night: snow },
    75: { day: snowDense, night: snowDense },
    77: { day: sleet, night: sleet },

    // Showers
    80: { day: rain, night: rain },
    81: { day: rain, night: rain },
    82: { day: rainDense, night: rainDense },

    // Snow showers
    85: { day: snow, night: snow },
    86: { day: snowDense, night: snowDense },

    // Thunderstorm
    95: { day: thunderstorm, night: thunderstorm },
    96: { day: thunderstorm, night: thunderstorm },
    99: { day: hail, night: hail },
};

export const WeatherIcon: FC<WeatherIconProps> = ({ code, isDay = 1 }) => {
    return <Icon className="weather__icon" width={60} height={60} icon={isDay === 1 ? weatherIcons[code].day : weatherIcons[code].night} />
}


