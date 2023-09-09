import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleErrors } from '../errors/handle.error';
import jwtTokenManager from '../manager/jwt_token_manager';
import UserModel from '../models/user.model';

const tokenManager = new jwtTokenManager();

export default class UserController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, phone, photoUrl, address } = req.body;
      await Promise.resolve().then(async () => {
        const user = await UserModel.register(
          name,
          email,
          password,
          phone,
          photoUrl,
          address
        );
        const token = tokenManager.createToken(user?._id);
        res.status(200).json({ user, token });
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.login(email, password);
        const token = tokenManager.createToken(user._id);
        res.status(200).json({ id: user?._id, token });
      });
    } catch (err) {
      handleErrors(err, res);
    }
  }

  public async getSingleUSer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userID = req.user?.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: 'User not found.' });
        return;
      }

      if (id !== userID) {
        res.status(403).json({ msg: 'Forbidden' });
        return;
      }

      console.log(id, userID);
      await Promise.resolve().then(async () => {
        const user = await UserModel.findById(id);
        res.status(200).json(user);
      });
    } catch (err) {
      handleErrors(err, res);
    }
  }
}
