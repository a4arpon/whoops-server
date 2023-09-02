import { Document } from 'mongoose';
import { Booking } from './Booking.type';
import { User } from './user.type';

export type Payment = {
  user: User;
  booking: Booking;
} & Document;
