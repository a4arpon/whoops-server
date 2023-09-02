import mongoose, { model, Schema } from 'mongoose';
import { User } from '../types/user.type';

export const userSchema = new Schema<User>(
  {
    name: {
      required: true,
      type: String,
    },
    photoUrl: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
  },
  { timestamps: true }
);

const UserModel = model<User>('User', userSchema);
export default UserModel;
