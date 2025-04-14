import { database } from "@/lib/mock-db"
import { type TicketEvent } from "@/types/TicketEvent";
import { type EventLocation } from "@/types/EventLocation";

type GetEventByIdParams = {
  params: {
    id: string
  }
};

export async function GET(_: Request, { params }: GetEventByIdParams) {
  const { id } = params;

  const defaultEvent = {
    id: 0,
    name: '',
    alerts: 0,
    date: '',
    locationId: 0,
    description: '',
    imageUrl: '',
  };
  const evt: TicketEvent = await database.getEvent(Number(id)) ?? defaultEvent;
  const locations: Map<number, EventLocation> = await database.getLocations();
  
  return Response.json({
      ...evt,
      location: locations.get(evt?.locationId) ?? null,
  })
}
