import mongoose, { model, Schema } from 'mongoose';
import { TourPackage } from '../types/tourPackage.type';

export const TourPackageSchema = new Schema<TourPackage>(
  {
    name: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    date: { type: String, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
  },
  { timestamps: true }
);

const TourPackageModel = model<TourPackage>('TourPackage', TourPackageSchema);
export default TourPackageModel;
