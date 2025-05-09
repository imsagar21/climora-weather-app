import { coordinates } from "@/api/types";
import {
  getCurrentWeather,
  getForecast,
  getSearchLocation,
  reverseGeocode,
} from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// const WEATHER_KEYS: WEATHERKEYS = {
//   weather: (coords: coordinates) => ["weather", coords],
//   forecast: (coords: coordinates) => ["forecast", coords],
//   location: (coords: coordinates) => ["location", coords],
// };

export const WEATHER_KEYS = {
  weather: (coords: coordinates) => ["weather", coords] as const,
  forecast: (coords: coordinates) => ["forecast", coords] as const,
  location: (coords: coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? getCurrentWeather(coordinates) : null),
    enabled: !!coordinates,
  });
}
export function useForecastQuery(coordinates: coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}
export function useReverseGeoCodeQuery(coordinates: coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? reverseGeocode(coordinates) : null),
    enabled: !!coordinates,
  });
}
export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => getSearchLocation(query),
    enabled: query.length > 3,
  });
}
