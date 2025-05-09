import { API_CONFIG } from "./config";
import {
  coordinates,
  forecastData,
  geocodingResponse,
  weatherData,
} from "./types";

export function CreateUrl(
  endpoint: string,
  params: Record<string, string | number>
) {
  const searchparams = new URLSearchParams({
    appid: API_CONFIG.API_KEY,
    ...params,
  });
  return `${endpoint}?${searchparams.toString()}`;
}

export async function fetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API Error:${response.statusText}`);
  }
  return response.json();
}
export async function getCurrentWeather({
  lat,
  lon,
}: coordinates): Promise<weatherData> {
  const url = CreateUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });
  return fetchUrl<weatherData>(url);
}

export async function getForecast({
  lat,
  lon,
}: coordinates): Promise<forecastData> {
  const url = CreateUrl(`${API_CONFIG.BASE_URL}/forecast`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });
  return fetchUrl<forecastData>(url);
}
export async function reverseGeocode({
  lat,
  lon,
}: coordinates): Promise<geocodingResponse[]> {
  const url = CreateUrl(`${API_CONFIG.GEO}/reverse`, {
    lat: lat.toString(),
    lon: lon.toString(),
    limit: 1,
  });
  return fetchUrl<geocodingResponse[]>(url);
}
export async function getSearchLocation(
  query: string
): Promise<geocodingResponse[]> {
  const url = CreateUrl(`${API_CONFIG.GEO}/direct`, {
    q: query,
    limit: "5",
  });
  return fetchUrl<geocodingResponse[]>(url);
}
