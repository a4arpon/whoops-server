"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resortsRouter = express_1.default.Router();
// Get all resorts
resortsRouter.get('/:id/resorts/');
// Get a resorts
resortsRouter.get('/:id/resorts/:id');
// add resort
resortsRouter.post('/:id/resorts/');
// update a resort
resortsRouter.put('/:id/resorts/:id');
// delete a resort
resortsRouter.delete('/:id/resorts/:id');
exports.default = resortsRouter;
