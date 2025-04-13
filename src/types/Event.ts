import { type Location } from '@/types/EventLocation';

export type Event = {
  id: number,
  name: string;
  alerts: number;
  date: Date;
  locationId: number;
  description: string;
  imageUrl: string;
  location?: Location;
};