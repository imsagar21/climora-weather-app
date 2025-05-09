import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface FavoriteItems {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorities() {
  const [favorities, setFavorities] = useLocalStorage<FavoriteItems[]>(
    "favorities",
    []
  );
  const queryClient = useQueryClient();

  const favoritiesQuery = useQuery({
    queryKey: ["favorities"],
    queryFn: () => favorities,
    initialData: favorities,
    staleTime: Infinity,
  });

  const addFavorities = useMutation({
    mutationFn: async (city: Omit<FavoriteItems, "id" | "addedAt">) => {
      const newFavorite: FavoriteItems = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      const exists = favorities.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorities;

      const newFavorities = [...favorities, newFavorite];
      setFavorities(newFavorities);

      return newFavorities;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorities"] });
    },
  });

  const removeFavorities = useMutation({
    mutationFn: async (cityId: string) => {
      const filteredFavorities = favorities.filter(
        (city) => city.id !== cityId
      );
      setFavorities(filteredFavorities);
      return filteredFavorities;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorities"] });
    },
  });
  return {
    favorities: favoritiesQuery.data,
    addFavorities,
    removeFavorities,
    isFavorite: (lat: number, lon: number) => {
      return favorities.some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
