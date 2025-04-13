import { type EventLocation } from '@/types/EventLocation';

export type Event = {
  id: number,
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
  location?: EventLocation;
};