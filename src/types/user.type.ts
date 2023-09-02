import { Document } from 'mongoose';
import { Booking } from './Booking.type';
import { Payment } from './payment.type';

export type User = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  photoUrl: string;
  bookings: Booking[];
  payments: Payment[];
  role: 'user' | 'admin';
} & Document;
