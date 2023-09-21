"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentRouter = express_1.default.Router();
// add  a payment for user
paymentRouter.post('/bookings/:id/users/:id');
// update all payments for user
paymentRouter.get('/users/:id');
//  update a payment for user
paymentRouter.get('/:id/users/:id');
// get all payment list
paymentRouter.get('/');
exports.default = paymentRouter;
