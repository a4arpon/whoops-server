import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleErrors } from '../errors/handle.error';
import resortModal from '../models/resort.model';

export default class ResortController {
  constructor() {}

  public async allResort(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'Invalid Query' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resorts = await resortModal.find({ location: id });
        res.status(200).json(resorts);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async singleResort(req: Request, res: Response): Promise<void> {
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
        const resort = await resortModal.findById(rid);
        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async createResort(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async updateResort(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {
      await handleErrors(err, res);
    }
  }

  public async deleteResort(req: Request, res: Response): Promise<void> {
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
        const resort = await resortModal.findByIdAndDelete(rid);
        res.status(200).json(resort);
      });
    } catch (err) {
      await handleErrors(err, res);
    }
  }
}
