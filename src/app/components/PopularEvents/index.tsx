"use client";

import { AArrowUp, Calendar, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { Card } from "../Card";
import { type TicketEvent } from "@/types/TicketEvent";
import IconButton from "../Buttons/IconButton";
import { localize } from "@/lib/localization";

export function PopularEvents() {
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [eventsResult, setEventsResult] = useState<TicketEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPopularEvents = async () => {
      const data = await fetch("/api/events/popular?amount=6").then(
        (response) => response.json()
      );

      setEvents(data.events);
      setEventsResult(data.events);
      setLoading(false);
    };

    fetchPopularEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredEvents = events.filter((evt) => {
        const term = searchTerm.toLowerCase();
        const matchName = evt.name.toLowerCase().includes(term);
        const matchLocationCity = evt.location?.city
          .toLowerCase()
          .includes(term);
        const matchLocationName = evt.location?.name
          .toLowerCase()
          .includes(term);
        const matchLocationCountry = evt.location?.country
          .toLowerCase()
          .includes(term);
        return (
          matchName ||
          matchLocationCity ||
          matchLocationName ||
          matchLocationCountry
        );
      });
      setEventsResult(filteredEvents);
    } else {
      setEventsResult(events);
    }
  }, [searchTerm]);

  return (
    <div>
      <header className="p-2">
        <h1 className="text-xl text-foreground md:col-span-3 flex items-center gap-2 mb-7">
          <Calendar />
          {localize("popularEventsTitle")}
        </h1>
        <SearchBar
          onChange={(term) => {
            setSearchTerm(term);
          }}
        />
      </header>

      <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-7">
        {loading && (
          <div className="grid place-items-center md:col-span-3 p-10">
            <Loader className="animate-spin" />
          </div>
        )}
        {eventsResult.map((event) => (
          <Card key={event.id} event={event} url={`/details/${event.id}`} />
        ))}
        <UpButton />
      </main>
    </div>
  );
}

const UpButton = () => (
  <div className="mt-4 flex w-full justify-start">
    <IconButton
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <AArrowUp size={35} />
    </IconButton>
  </div>
);
