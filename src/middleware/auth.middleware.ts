import { NextFunction, Request, Response } from 'express';
import jwtTokenManager from '../manager/jwt_token_manager';
import UserModel from '../models/user.model';
import { User } from '../types/user.type';

interface JWTPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}

const tokenManager = new jwtTokenManager();

export default class AuthMiddleware {
  constructor() {}

  public async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    try {
      const payload = tokenManager.verifyToken(token) as JWTPayload;
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ msg: 'Unauthorized' });
        return;
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }
  }

  public verifyAdmin(req: Request, res: Response, next: NextFunction): void {
    const user = req.user;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }
  }
}
