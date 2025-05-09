import { useParams, useSearchParams } from "react-router-dom";
import CurrentWeather from "./CurrentWeather";
import HourlyTemperature from "./HourlyTemperature";
import WeatherDetails from "./WeatherDetails";
import WeatherForeCast from "./WeatherForeCast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { WeatherSkeleton } from "@/components/weather-skeleton";
import FavoriteButton from "./FavoriteButton";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const params = useParams();
  const weatherQuery = useWeatherQuery(coordinates ?? { lat: 0, lon: 0 });
  const forecastQuery = useForecastQuery(coordinates ?? { lat: 0, lon: 0 });

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* favorite cities */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName},{weatherQuery.data.sys.country}
        </h1>
        <div>{/* favotite Button */}</div>
        <FavoriteButton data={weatherQuery.data} />
      </div>

      <div className="grid gap-6">
        {/* Current Weather  */}
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 ">
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForeCast data={forecastQuery.data} />
      </div>
    </div>
  );
};

export default CityPage;
