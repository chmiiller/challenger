import { getEvents, getLocations } from "./mock-data"

export const database = {
  getPopularEvents: async (amount: number, offset: number) => {
    const events = await getEvents();
    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset);
  },
  getEvent: async (id: number) => {
    const events = await getEvents();
    const evt = events.find((event) => (event.id === id));
    if (!evt) return null;
    const locations = await getLocations();
    return {
      ...evt,
      location: locations.get(evt.locationId) ?? null,
    };  
  },
  getLocation: async (id: number) => {
    const locations = await getLocations();
    return locations.get(id) ?? null
  },
  getLocations: async () => {
    return await getLocations();
  },
}
