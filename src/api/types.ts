export interface coordinates {
  lat: number;
  lon: number;
}
export interface weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface WEATHERKEYS {
  weather: (cord: coordinates) => Array<string | coordinates>;
  forecast: (cord: coordinates) => Array<string | coordinates>;
  location: (cord: coordinates) => Array<string | coordinates>;
}
export interface weatherData {
  coord: coordinates;
  weather: weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
}

export interface forecastData {
  list: Array<{
    dt: number;
    main: weatherData["main"];
    weather: weatherData["weather"];
    wind: weatherData["wind"];
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}
export interface geocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
