import { database } from "@/lib/mock-db"
import { type Event } from "@/types/Event";
import { type EventLocation } from "@/types/EventLocation";

type GetEventByIdParams = {
  params: {
    id: string
  }
};

export async function GET(_: Request, { params }: GetEventByIdParams) {
  const { id } = params;

  const evt: Event | null = await database.getEvent(Number(id));
  const locations: Map<number, EventLocation> = await database.getLocations();

  if (!evt) return null;
  
  return Response.json({
      ...evt,
      location: locations.get(evt.locationId) ?? null,
  })
}
