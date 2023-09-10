import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleErrors } from '../errors/handle.error';
import locationModal from '../models/location.model';

export default class LocationController {
  constructor() {}

  public async allLocation(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const locations = await locationModal.find({});
        res.status(200).json(locations);
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }

  public async singleLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.send(404).json({ msg: 'location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const location = await locationModal
          .findById(id)
          .populate('resorts restaurants spots tourPackages ')
          .exec();

        res.status(200).json(location);
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }

  public async createLocation(req: Request, res: Response): Promise<void> {
    try {
      const { name, photoUrl, description } = req.body;
      await Promise.resolve().then(async () => {
        const newLocation = await locationModal.create({
          name,
          photoUrl,
          description,
        });

        res.status(200).json(newLocation);
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }

  public async updateLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl, description } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const newLocation = await locationModal.findByIdAndUpdate(
          id,
          {
            name,
            photoUrl,
            description,
          },
          { new: true }
        );
        res.status(200).json(newLocation);
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }

  public async deleteLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const location = await locationModal.findByIdAndDelete(id);
        res.status(200).json(location);
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }
}
