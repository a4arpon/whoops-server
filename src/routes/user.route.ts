import jwtTokenManager from '../manager/jwt_token_manager';
import { User } from '../types/user.type';

interface JWTPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    users?: User;
  }
}

const tokenManager = new jwtTokenManager();
