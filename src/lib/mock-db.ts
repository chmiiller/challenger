import { getEvents, getLocations } from "./mock-data"
import { type Event} from '@/types/Event';
import { type EventLocation } from "@/types/EventLocation";

export const database = {
  getPopularEvents: async (amount: number, offset: number): Promise<Event[]> => {
    const events = await getEvents() as unknown as Event[];
    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset);
  },
  getEvent: async (id: number): Promise<Event | null> => {
    const events = await getEvents() as unknown as Event[];
    return events.find((event) => (event.id === id)) ?? null;
  },
  getLocation: async (id: number) => {
    const locations = await getLocations();
    return locations.get(id) ?? null
  },
  getLocations: async (): Promise<Map<number, EventLocation>> => {
    return await getLocations() as unknown as Map<number, EventLocation>;
  },
}
