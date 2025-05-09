// import { getCurrentWeather } from "@/api/weather";
// import { weatherData } from "@/api/types";
// import { Button } from "@/components/ui/button";
// import useGeoLocation from "@/hooks/useGeoLocation";
// import { RefreshCw } from "lucide-react";
// import { useEffect, useState } from "react";
// import CurrentWeather from "./CurrentWeather";

// const WeatherApp = () => {
//   // const [currentData, setCurrentData] = useState<weatherData | null>(null);
//   const { coordinates, error, isLoading, getLocation } = useGeoLocation();
//   console.log(coordinates);

//   async function fetchData (){

//     if(coordinates){

//       const data = await getCurrentWeather(coordinates)
//       console.log(data);

//     }
//   }

//   useEffect(() => {
//     fetchData().then()
//     console.log("1st render");

//   },[]);

//   return (
//     <div className="space-y-4">
//       {/* favorite cities */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold tracking-tight">My Locations</h1>
//         <Button variant={"outline"} size={"icon"} onClick={()=>getLocation()}>
//           <RefreshCw className="h-4 w-4" />
//         </Button>
//       </div>
//       {/* {currentData && <CurrentWeather data={currentData} />} */}
//     </div>
//   );
// };

// export default WeatherApp;
