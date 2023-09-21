import { Document } from 'mongoose';
import { Spot } from './Spot.type';
import { Resort } from './resort.type';
import { Restaurant } from './restaurant.type';
import { TourPackage } from './tourPackage.type';

export type Location = {
  name: string;
  photoUrl: string;
  description: string;
  spots: Spot[];
  resorts: Resort[];
  restaurants: Restaurant[];
  tourPackages: TourPackage[];
} & Document;
