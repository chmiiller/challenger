"use client";

import { useEffect, useState } from "react";

type DetailsProps = {
  params: {
    id: string;
  };
};
export default function Details({ params }: DetailsProps) {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    console.log(`---------------------> on useEffect`);
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    console.log(`---------------------> gonna fetch event`);
  };
  return <div>{`Event ID: ${id}`}</div>;
}
