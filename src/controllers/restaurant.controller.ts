import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleErrors } from '../errors/handle.error';
import locationModal from '../models/location.model';
import restaurantModal from '../models/resturant.model';

export default class RestaurantController {
  constructor() {}

  public async allRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resorts = await restaurantModal.find({ location: id });
        res.status(200).json(resorts);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async singleRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        !mongoose.Types.ObjectId.isValid(rid) ||
        (!mongoose.Types.ObjectId.isValid(id) &&
          !mongoose.Types.ObjectId.isValid(rid))
      ) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await restaurantModal.findById(rid);
        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await restaurantModal.create({
          name,
          photoUrl,
          location: id,
        });

        await locationModal.findByIdAndUpdate(id, {
          $addToSet: {
            resorts: resort._id,
          },
        });

        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;
      const { name, photoUrl } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        !mongoose.Types.ObjectId.isValid(rid) ||
        (!mongoose.Types.ObjectId.isValid(id) &&
          !mongoose.Types.ObjectId.isValid(rid))
      ) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await restaurantModal.findByIdAndUpdate(
          rid,
          {
            name,
            photoUrl,
          },
          { new: true }
        );
        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        !mongoose.Types.ObjectId.isValid(rid) ||
        (!mongoose.Types.ObjectId.isValid(id) &&
          !mongoose.Types.ObjectId.isValid(rid))
      ) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await restaurantModal.findByIdAndDelete(rid);
        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }
}
