import { Model } from 'mongoose';
import { User } from '../types/user.type';

export interface userModelInterface extends Model<User> {
  register(
    name: string,
    email: string,
    password: string,
    photoUrl: string,
    address?: string,
    phone?: string
  ): Promise<User>;
  login(email: string, password: string): Promise<User>;
}
