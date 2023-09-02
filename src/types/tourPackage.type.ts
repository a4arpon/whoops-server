import { Document } from 'mongoose';
import { Booking } from './Booking.type';
import { Location } from './location.type';

export type TourPackage = {
  name: string;
  photoUrl: string;
  price: number;
  date: string;
  limit: number;
  transport: string;
  availableSeats: number;
  location: Location;
  bookings: Booking[];
} & Document;
