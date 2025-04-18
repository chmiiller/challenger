import Link from "next/link";
import Image from "next/image";

import { type TicketEvent } from "@/types/TicketEvent";

type CardProps = {
  event: TicketEvent;
  url: string;
};

export function Card({ event, url }: CardProps) {
  return (
    <Link
      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
      href={url}
    >
      <div className="absolute inset-x-0 bottom-0 p-2 bg-black/20">
        <h1 className="text-sm text-primary-foreground font-semibold">
          {event.name}
        </h1>
        <p className="text-xs text-secondary-foreground">
          {event.location?.name}, {event.location?.city} -{" "}
          {new Date(event.date).toLocaleDateString()}
        </p>
      </div>

      <Image
        className="object-cover h-full w-full"
        src={event.imageUrl}
        width={320}
        height={200}
        alt={`${event.name} banner image`}
      />
    </Link>
  );
}
