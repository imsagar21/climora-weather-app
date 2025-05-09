import { weatherData } from "@/api/types";
import { Button } from "@/components/ui/button";
import { useFavorities } from "@/hooks/useFavorities";
import { Star } from "lucide-react";
import { toast } from "sonner";
interface FavoriteButtonProps {
  data: weatherData;
}
const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addFavorities, removeFavorities, isFavorite } = useFavorities();

  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  function handleToggleFavorite() {
    const cityName = data.name;
    if (isCurrentlyFavorite) {
      removeFavorities.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${cityName} from Favorities`);
    } else {
      addFavorities.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${cityName} to Favorities`);
    }
  }

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;
