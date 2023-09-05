"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationRouter = express_1.default.Router();
// add  a location
locationRouter.post('/');
// update a location
locationRouter.put('/:id');
// delete a location
locationRouter.delete('/:id');
// get all locations list
locationRouter.get('/');
// get a single location
locationRouter.get('/:id');
exports.default = locationRouter;
