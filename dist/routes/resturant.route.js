"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantRouter = express_1.default.Router();
// Get all restaurant
restaurantRouter.get('/');
// Get a restaurant
restaurantRouter.get('/:id');
// add restaurant
restaurantRouter.post('/');
// update a restaurant
restaurantRouter.put('/:id');
// delete a restaurant
restaurantRouter.delete('/:id');
exports.default = restaurantRouter;
