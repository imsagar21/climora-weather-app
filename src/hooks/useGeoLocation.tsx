import { coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationState {
  coordinates: coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });
  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "No Support given by browser",
        isLoading: false,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied,please enable location access";

            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";

            break;
          case error.TIMEOUT:
            errorMessage = "Location request Timedout";

            break;

          default:
            errorMessage = "An Unknown Error Occurred";
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeoLocation;
