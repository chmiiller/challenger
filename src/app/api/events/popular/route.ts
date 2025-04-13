import { database } from "@/lib/mock-db"
import { type Event } from "@/types/Event";
import { type EventLocation } from "@/types/EventLocation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount")) ?? 5;
  const offset = Number(searchParams.get("offset")) ?? 0;

  const events: Event[] = await database.getPopularEvents(amount, offset);
  const locations: Map<number, EventLocation> = await database.getLocations();

  return Response.json({
    events: events.map((evt) => ({
      ...evt,
      location: locations.get(evt.locationId),
    }))
  })
}
