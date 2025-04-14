"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

import { Logo } from "../../components/Logo";
import { type TicketEvent } from "@/types/TicketEvent";
import Button from "@/app/components/Buttons/Button";
import IconLabel from "@/app/components/Labels/IconLabel";
import { Map } from "@/app/components/Map";
import Link from "next/link";
import TopBarActions from "@/app/components/TopBarActions";
import { localize } from "@/lib/localization";

type DetailsProps = {
  params: {
    id: string;
  };
};
export default function Details({ params }: DetailsProps) {
  const { id } = params;
  const [event, setEvent] = useState<TicketEvent | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

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
      {showDialog && (
        <div className="flex items-center justify-between h-8 p-2 mb-2 rounded bg-primary">
          <h1 className="text-lg text-center text-white">
            {`copied event's link to clipboard`}
          </h1>
        </div>
      )}
      <header className="flex flex-row items-center justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
        {/* Top Bar Action Buttons */}
        {event && (
          <TopBarActions
            event={event}
            showDialog={(shouldDisplay: boolean) => {
              setShowDialog(shouldDisplay);
            }}
          />
        )}
      </header>
      {event && (
        <div className="flex justify-center">
          <div className="lg:w-1/2 xl:w-2/6">
            {/* Hero image */}
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
              <div className="mb-3">
                <IconLabel label={new Date(event.date).toLocaleDateString()}>
                  <Calendar size={24} color={"#FF0084"} />
                </IconLabel>
              </div>
              <IconLabel
                label={`${event?.location?.name}, ${event?.location?.city}`}
              >
                <MapPin size={24} />
              </IconLabel>
            </div>

            {/* CTA */}
            <div className="flex">
              <Button
                label={localize("detailsCTAButton")}
                onClick={() => {
                  console.log(`---------------------> Buy Tickets!`);
                }}
              />
            </div>
            {/* More Info */}
            {event.description && (
              <div className="flex flex-col w-full mt-9 p-4">
                <h1 className="text-2xl font-bold">
                  {localize("moreInfoTitle")}
                </h1>
                {/* Description container */}
                <div className="w-full rounded-md bg-secondary-background p-3 mt-4">
                  <h1 className="text-base">{event.description}</h1>
                </div>
              </div>
            )}
            {/* Map */}
            <div className="flex flex-col w-full mt-4 p-4">
              <h1 className="text-2xl font-bold">{localize("mapTitle")}</h1>
              <div className="h-[40vh] mt-4">
                <Map event={event} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
