import mongoose, { Schema, model } from 'mongoose';
import { Booking } from '../types/booking.type';

const bookingSchema = new Schema<Booking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tourPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  },
  { timestamps: true }
);

const locationModal = model<Booking>('Booking', bookingSchema);

export default locationModal;
