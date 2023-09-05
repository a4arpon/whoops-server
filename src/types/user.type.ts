import { Document } from 'mongoose';
import { Booking } from './booking.type';
import { Payment } from './payment.type';

export type User = {
  name: string;
  email: string;
  password: string;
  phone: string;
  photoUrl?: string;
  address?: string;
  bookings: Booking[];
  payments: Payment[];
  role: 'user' | 'admin';
} & Document;
