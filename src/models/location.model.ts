import mongoose, { Schema, model } from 'mongoose';
import { Location } from '../types/location.type';

const locationSchema = new Schema<Location>(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
    description: { type: String, required:true },
    tourPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourPackage',
      },
    ],
    resorts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resort',
      },
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
    ],
    spots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
      },
    ],
  },
  { timestamps: true }
);

const locationModal = model<Location>('Location', locationSchema);

export default locationModal;
