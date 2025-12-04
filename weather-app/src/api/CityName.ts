import { useQuery } from '@tanstack/react-query';
import { z } from 'zod'


export const GeoCitySchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    elevation: z.number(),
    feature_code: z.string(),
    country_code: z.string(),
    admin1_id: z.number(),
    timezone: z.string(),
    country_id: z.number(),
    country: z.string(),
    admin1: z.string(),

    population: z.number().optional(),
    postcodes: z.array(z.string()).optional(),
    admin2_id: z.number().optional(),
    admin3_id: z.number().optional(),
    admin4_id: z.number().optional(),
    admin2: z.string().optional(),
    admin3: z.string().optional(),
    admin4: z.string().optional(),
}); // city

export const GeoListSchema = z.object({
    results: z.array(GeoCitySchema),
    generationtime_ms: z.number(),
}); // cities array

export type City = z.infer<typeof GeoCitySchema>;

export type CityList = z.infer<typeof GeoListSchema>; // answer of server

export function fetchCity(url: string): Promise<City> {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => GeoCitySchema.parse(data));
};

export interface RequestCityState {
    status: 'idle' | 'pending' | 'success' | 'error';
    data?: City;
    error?: unknown;
}

export function fetchCityList(url: string): Promise<CityList> {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => GeoListSchema.parse(data));
};


export function UseCityDisplay(
    url: string,
) {
    const query = useQuery({
        queryKey: ['contry', url],
        queryFn: async () => {
            const data = await fetchCity(url);
            return data
        },
    });

    const state: RequestCityState = {
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

    const refetch = () => query.refetch();

    return {
        state,
        refetch,
    };
} // one city

interface RequestState {
    status: 'idle' | 'pending' | 'success' | 'error';
    data?: CityList;
    error?: unknown;
}

export function UseCityList(
    url: string,
) {
    const query = useQuery({
        queryKey: ['contries', url],
        queryFn: async () => {
            const data = await fetchCityList(url);
            return data
        },
    });

    const state: RequestState = {
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

    const refetch = () => query.refetch();

    return {
        state,
        refetch,
    };
}