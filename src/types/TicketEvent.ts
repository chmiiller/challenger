import { type EventLocation } from '@/types/EventLocation';

export type TicketEvent = {
  id: number,
  name: string;
  alerts: number;
  date: string;
  locationId: number;
  description: string | null;
  imageUrl: string;
  location?: EventLocation;
};