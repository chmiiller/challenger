"use client";

import { Calendar, Loader, AArrowUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { Card } from "../Card";

export function PopularEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [eventsResult, setEventsResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");

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
    if (searchValue) {
      const filteredEvents = events.filter((evt) =>
        evt.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setEventsResult(filteredEvents);
    } else {
      setEventsResult(events);
    }
  }, [searchValue]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <h1 className="text-xl text-foreground md:col-span-3 flex items-center gap-2">
        <Calendar /> Popular events
      </h1>
      <SearchBar
        onChange={(searchInput) => {
          setSearchValue(searchInput);
        }}
      />

      {loading && (
        <div className="grid place-items-center md:col-span-3 p-10">
          <Loader className="animate-spin" />
        </div>
      )}

      {eventsResult.map((event) => (
        <Card event={event} url={`/details/${event.id}`} />
      ))}
    </div>
  );
}
