import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const userRouter: Router = express.Router();

const userInstance = new UserController();
const authInstance = new AuthMiddleware();

userRouter.post('/register', userInstance.register);

userRouter.post('/login', userInstance.login);

export default userRouter;
