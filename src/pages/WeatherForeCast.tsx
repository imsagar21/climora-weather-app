import { forecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface weatherForecastProps {
  data: forecastData;
}
interface DailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  };
  wind: number;
  date: number;
}

const WeatherForeCast = ({ data }: weatherForecastProps) => {
  const dailyForeCast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        weather: forecast.weather[0],
        wind: forecast.wind.speed,
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const nextDays = Object.values(dailyForeCast);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid lg:grid-cols-3 grid-cols-1 gap-4 items-center rounded-lg border p-4"
              >
                <div>
                  <p className="font-meduim">
                    {format(new Date(day.date * 1000), "EEE,MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex gap-4 justify-end">
                  <span className="flex items-center gap-1 ">
                    <Droplets className="h-4 w-4 text-blue-500 " />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1 ">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForeCast;
