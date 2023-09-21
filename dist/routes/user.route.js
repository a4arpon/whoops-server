"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const userRouter = express_1.default.Router();
const userInstance = new user_controller_1.default();
const authInstance = new auth_middleware_1.default();
userRouter.post('/register', userInstance.register);
userRouter.post('/login', userInstance.login);
userRouter.get('/:id', authInstance.verifyUser, userInstance.getSingleUSer);
exports.default = userRouter;
