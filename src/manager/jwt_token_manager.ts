import dotenv from 'dotenv';
import Jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export default class jwtTokenManager {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    (this.secret = process.env.JWT_SECRET as string), (this.expiresIn = '7d');
  }

  public createToken(id: string): string {
    try {
      const token = Jwt.sign({ id }, this.secret, {
        expiresIn: this.expiresIn,
      });
      return token;
    } catch (err) {
      throw new Error('Error while generating token.');
    }
  }
  public verifyToken(token: string): JwtPayload | object | string {
    try {
      const verifiedToken = Jwt.verify(token, this.secret)
      return verifiedToken
    } catch (err) {
      throw new Error('Error while generating token.');
    }
  }
}
