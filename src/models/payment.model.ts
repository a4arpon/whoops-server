import mongoose, { Schema, model } from 'mongoose';
import { Payment } from '../types/payment.type';

const paymentSchema = new Schema<Payment>(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const paymentModal = model<Payment>('Payment', paymentSchema);

export default paymentModal;
