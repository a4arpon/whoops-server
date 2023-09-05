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
      });
    } catch (err: unknown) {
      await handleErrors(err, res);
    }
  }
}
