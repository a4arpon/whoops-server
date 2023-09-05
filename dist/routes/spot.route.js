"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotRouter = express_1.default.Router();
// Get all spot
spotRouter.get('/');
// Get a spot
spotRouter.get('/:id');
// add spot
spotRouter.post('/');
// update a spot
spotRouter.put('/:id');
// delete a spot
spotRouter.delete('/:id');
exports.default = spotRouter;
