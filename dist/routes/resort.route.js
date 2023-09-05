"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resortsRouter = express_1.default.Router();
// Get all resorts
resortsRouter.get('/');
// Get a resorts
resortsRouter.get('/:id');
// add resort
resortsRouter.post('/');
// update a resort
resortsRouter.put('/:id');
// delete a resort
resortsRouter.delete('/:id');
exports.default = resortsRouter;
