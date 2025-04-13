"use client";

import { useEffect, useState } from "react";
import { type Event } from "@/types/Event";

type DetailsProps = {
  params: {
    id: string;
  };
};
export default function Details({ params }: DetailsProps) {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const event: Event = await fetch(`/api/events/${id}`).then((response) =>
        response.json()
      );
      setEvent(event);
    };
    fetchEvent(id);
  }, []);

  return <div>{event && <div>{`Event: ${event.name}`}</div>}</div>;
}
