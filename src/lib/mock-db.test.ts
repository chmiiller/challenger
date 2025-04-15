import { describe, it, expect, vi, beforeEach } from 'vitest';
import { database } from './mock-db'
import { getEvents, getLocations } from './mock-data'
import { type TicketEvent } from '@/types/TicketEvent'
import { type EventLocation } from '@/types/EventLocation';

// mocking `mock-data` functions
vi.mock('./mock-data', () => {
  return { 
    getEvents: vi.fn(),
    getLocations: vi.fn(),
  };
});

describe('testing database methods', () => {
  let mockEvents: TicketEvent[];
  let mockLocations: EventLocation[];

  beforeEach(() => {
    vi.clearAllMocks();
    mockEvents = [
      { id: 1, name: "Lowlands", alerts: 1, date: "2021-08-20T10:00:00+02:00", locationId: 1, description: "", imageUrl: "" },
      { id: 2, name: "Awakenings", alerts: 1, date: "2021-06-26T12:00:00+02:00", locationId: 2, description: "", imageUrl: "" },
      { id: 3, name: "Harry", alerts: 1, date: "2021-03-27T20:00:00+01:00", locationId: 3, description: null, imageUrl: "" },
      { id: 4, name: "Down", alerts: 1, date: "2021-07-02T10:00:00+02:00", locationId: 4, description: "", imageUrl: "" },
    ];
    mockLocations = [
      {id: 1,name: "Biddinghuizen",city: "Dronten",country: "Netherlands",imageUrl: "" },
      {id: 2,name: "Recreatiegebied Spaarnwoude",city: "Velsen",country: "Netherlands",imageUrl: "" },
      {id: 3,name: "Ziggo Dome",city: "Amsterdam",country: "Netherlands",imageUrl: "" },
      {id: 4,name: "Ficarystraat 9",city: "Nijmegen",country: "Netherlands",imageUrl: "" },
    ];
  });

  it('should test if getPopularEvents returns the requested number of events', async () => {
    (getEvents as any).mockResolvedValue(mockEvents);

    const amount = 2;
    const popularEvents = await database.getPopularEvents(amount, 0);

    expect(popularEvents).toHaveLength(amount);
    expect(getEvents).toHaveBeenCalledTimes(1);
    expect(popularEvents[0].id).toBe(1);
    expect(popularEvents[1].id).toBe(2);
  });
  
  it('should test if getPopularEvents returns the requested events with the correct offset', async () => {
    (getEvents as any).mockResolvedValue(mockEvents);

    const amount = 2;
    const popularEvents = await database.getPopularEvents(amount, 2);

    expect(popularEvents).toHaveLength(amount);
    expect(getEvents).toHaveBeenCalledTimes(1);
    expect(popularEvents[0].id).toBe(3);
    expect(popularEvents[1].id).toBe(4);
  });

  it('should test if getPopularEvents returns events ordered by alerts', async () => {
    const mockSortedEvents = mockEvents;
     //should be second
    mockSortedEvents[0] = { ...mockSortedEvents[0], alerts: 100 };
     //should be the last one
    mockSortedEvents[1] = { ...mockSortedEvents[1], alerts: 5 };
     // should be the first
    mockSortedEvents[2] = { ...mockSortedEvents[2], alerts: 400 };
     // should be third
    mockSortedEvents[3] = { ...mockSortedEvents[3], alerts: 50 };
    (getEvents as any).mockResolvedValue(mockSortedEvents);

    const amount = 4;
    const popularEvents = await database.getPopularEvents(amount, 0);

    expect(popularEvents).toHaveLength(amount);
    expect(getEvents).toHaveBeenCalledTimes(1);
    expect(popularEvents[0].id).toBe(3);
    expect(popularEvents[1].id).toBe(1);
    expect(popularEvents[2].id).toBe(4);
    expect(popularEvents[3].id).toBe(2);
  });

  it('should return the event with the specified id when calling getEvent', async () => {
    (getEvents as any).mockResolvedValue(mockEvents);

    const eventId = 2;
    const event = await database.getEvent(eventId);

    expect(event).toEqual(mockEvents[1]);
    expect(getEvents).toHaveBeenCalledTimes(1);
  });

  it('should return null if no event with the specified id exists', async () => {
    (getEvents as any).mockResolvedValue(mockEvents);

    const eventId = 42;
    const event = await database.getEvent(eventId);

    expect(event).toBeNull();
    expect(getEvents).toHaveBeenCalledTimes(1);
  });

  it('should return null if there are no events', async () => {
    (getEvents as any).mockResolvedValue([]);

    const eventId = 1;
    const event = await database.getEvent(eventId);

    expect(event).toBeNull();
    expect(getEvents).toHaveBeenCalledTimes(1);
  });
  
  it('should return a Map of locations', async () => {
    const expectedMap = new Map<number, EventLocation>(mockLocations.map(location => [location.id, location]));
    (getLocations as any).mockResolvedValue(expectedMap);

    const locationsMap = await database.getLocations();

    expect(locationsMap).toBeInstanceOf(Map);
    expect(locationsMap.size).toBe(mockLocations.length);
    expect(locationsMap.get(1)).toEqual(mockLocations[0]);
    expect(locationsMap.get(2)).toEqual(mockLocations[1]);

    expect(getLocations).toHaveBeenCalledTimes(1);
  });
  
  it('should return a location with a specified ID', async () => {
    const expectedMap = new Map<number, EventLocation>(mockLocations.map(location => [location.id, location]));
    const expectedLocation = expectedMap.get(3) as EventLocation;
    (getLocations as any).mockResolvedValue(expectedMap);

    const location = await database.getLocation(3) as EventLocation;

    expect(location.id).toEqual(expectedLocation.id);
    expect(location).toEqual(expectedLocation);

    expect(getLocations).toHaveBeenCalledTimes(1);
  });
  
  it('should return null when getting a location with an non-existing ID', async () => {
    const expectedMap = new Map<number, EventLocation>(mockLocations.map(location => [location.id, location]));
    (getLocations as any).mockResolvedValue(expectedMap);

    const location = await database.getLocation(42);
    expect(location).toBeNull();
    expect(getLocations).toHaveBeenCalledTimes(1);
  });
});