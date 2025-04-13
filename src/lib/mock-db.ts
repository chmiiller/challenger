import { getEvents, getLocations } from "./mock-data"

export const database = {
  getPopularEvents: async (amount: number, offset: number) => {
    const events = await getEvents();
    const locations = await getLocations();
    
    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset)
      .map((event) => ({
        ...event,
        location: locations.get(event.locationId),
      }));
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
  }
}
