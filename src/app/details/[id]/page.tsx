"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Star, Share } from "lucide-react";

import { Logo } from "../../components/Logo";
import { type TicketEvent } from "@/types/TicketEvent";
import Button from "@/app/components/Buttons/Button";
import IconButton from "@/app/components/Buttons/IconButton";

type DetailsProps = {
  params: {
    id: string;
  };
};
export default function Details({ params }: DetailsProps) {
  const { id } = params;
  const [event, setEvent] = useState<TicketEvent | null>(null);

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const event: TicketEvent = await fetch(`/api/events/${id}`).then(
        (response) => response.json()
      );
      setEvent(event);
    };
    fetchEvent(id);
  }, []);

  return (
    <div className="p-3 px-4">
      <header className="flex flex-row items-center justify-between">
        <Logo />
        {/* Top Bat Action Buttons */}
        <div className="bg-slate-800/75 flex row items-center justify-around py-1 rounded-lg">
          <IconButton onClick={() => {}}>{<Star size={24} />}</IconButton>
          <IconButton onClick={() => {}}>{<Share size={24} />}</IconButton>
        </div>
      </header>
      {event && (
        <div className="flex justify-center">
          <div className="lg:w-1/2 xl:w-2/6">
            <div className="flex justify-center">
              <Image
                className="w-full max-w-lg md:max-w-xl lg:max-w-3xl rounded-md mt-9"
                src={event?.imageUrl}
                width={320}
                height={200}
                alt="event image"
              />
            </div>

            {/* Event Name */}
            <div className="flex justify-center">
              <h1 className="text-4xl text-center font-semibold w-2/3 mt-7">
                {event.name}
              </h1>
            </div>
            {/* Calendar and Location */}
            <div className="flex flex-col mt-7 items-center">
              <div className="flex flex-row items-center">
                <Calendar size={24} color={"#FF0084"} />
                <h3 className="text-base text-center ml-3">
                  {new Date(event.date).toLocaleDateString()}
                </h3>
              </div>
              <div className="flex flex-row items-center mt-5">
                <MapPin size={24} />
                <h3 className="text-base text-center ml-3">
                  {event?.location?.name}, {event?.location?.city}
                </h3>
              </div>
            </div>
            {/* CTA */}
            <div className="flex">
              <Button
                label="Buy tickets now!"
                onClick={() => {
                  console.log(`---------------------> Buy Tickets!`);
                }}
              />
            </div>
            {/* More Info */}
            <div className="flex flex-col w-full mt-9 p-4">
              <h1 className="text-2xl font-bold">{"More info"}</h1>
              {/* Description container */}
              <div className="w-full rounded-md bg-black p-3">
                <h1 className="text-base">{event.description}</h1>
              </div>
              {/* Map */}
              <div className="flex flex-col w-full h-64 mt-9 p-4">
                <h1 className="text-2xl font-bold">{"Map"}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
