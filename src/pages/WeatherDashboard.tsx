import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WeatherSkeleton } from "@/components/weather-skeleton";
import useGeoLocation from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import CurrentWeather from "./CurrentWeather";
import HourlyTemperature from "./HourlyTemperature";
import WeatherDetails from "./WeatherDetails";
import WeatherForeCast from "./WeatherForeCast";
import { FavoriteCities } from "./FavoriteCities";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: LocationError,
    isLoading: LocationLoading,
    getLocation,
  } = useGeoLocation();

  const locationQuery = useReverseGeoCodeQuery(
    coordinates ?? { lat: 0, lon: 0 }
  );
  const weatherQuery = useWeatherQuery(coordinates ?? { lat: 0, lon: 0 });
  const forecastQuery = useForecastQuery(coordinates ?? { lat: 0, lon: 0 });
  const isRefetching =
    locationQuery.isFetching ||
    weatherQuery.isFetching ||
    forecastQuery.isFetching;

  function handleRefresh() {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  }
  if (LocationLoading) {
    return <WeatherSkeleton />;
  }
  if (LocationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{LocationError}</p>
          <Button onClick={() => getLocation()} variant={"outline"}>
            <MapPin />
            <p>Enable Location</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={() => getLocation()} variant={"outline"}>
            <MapPin />
            <p>Enable Location</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data.please try again</p>
          <Button onClick={handleRefresh} variant={"outline"}>
            <RefreshCw />
            <p>Retry</p>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
      {/* favorite cities */}
      <FavoriteCities />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={isRefetching}
        >
          <RefreshCw
            className={`h-4 w-4 transition-transform ${
              isRefetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Current Weather  */}
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={
              locationName ?? {
                name: "Unknown",
                lat: 0,
                lon: 0,
                country: "Unknown",
              }
            }
          />
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

export default WeatherDashboard;
