import { TicketEvent } from "@/types/TicketEvent";
import IconButton from "../Buttons/IconButton";
import { useEffect, useState } from "react";
import { Share, Star } from "lucide-react";

type TopBarActionsProps = {
  event: TicketEvent;
  showDialog: (shouldDisplay: boolean) => void;
};
export default function TopBarActions({
  event,
  showDialog,
}: TopBarActionsProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (event?.id) {
      // Load from localStorage on mount
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const favoriteIds = JSON.parse(favorites);
        setIsFavorite(favoriteIds.includes(event.id));
      }
    }
  }, []);

  const toggleFavorite = () => {
    let favorites = localStorage.getItem("favorites");
    let favoriteIds = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      favoriteIds = favoriteIds.filter((id: number) => id !== event.id);
      setIsFavorite(false);
    } else {
      favoriteIds = [...favoriteIds, event.id];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  };
  return (
    <div className="bg-secondary-background flex row items-center justify-around py-1 rounded-lg">
      <IconButton
        onClick={() => {
          toggleFavorite();
        }}
      >
        {
          <Star
            size={24}
            color={isFavorite ? "hsl(44, 90%, 50%)" : "white"}
            fill={isFavorite ? "hsl(44, 90%, 50%)" : "transparent"}
          />
        }
      </IconButton>
      <IconButton
        onClick={() => {
          if (event && event.name) {
            navigator.clipboard.writeText(window.location.href);
            showDialog(true);
            setTimeout(() => {
              showDialog(false);
            }, 2000);
          }
        }}
      >
        {<Share size={24} />}
      </IconButton>
    </div>
  );
}
