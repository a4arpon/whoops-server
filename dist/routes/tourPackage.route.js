"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tourPackageRouter = express_1.default.Router();
// Get all tourPackage
tourPackageRouter.get('/');
// Get a tourPackage
tourPackageRouter.get('/:id');
// add tourPackage
tourPackageRouter.post('/');
// update a tourPackage
tourPackageRouter.put('/:id');
// delete a tourPackage
tourPackageRouter.delete('/:id');
exports.default = tourPackageRouter;
