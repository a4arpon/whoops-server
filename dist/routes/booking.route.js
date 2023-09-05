"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingRouter = express_1.default.Router();
// Get all booking
bookingRouter.get('/');
// Get all booking for specific user
bookingRouter.get('/:id/users/:id');
// get booking for user
bookingRouter.get('/users/:id');
// add booking
bookingRouter.post('/users/:id/tour_package/:id');
// Delete booking
bookingRouter.delete('/users/:id/tour_package/:id');
exports.default = bookingRouter;
