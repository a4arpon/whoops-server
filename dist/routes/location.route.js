"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const locationRouter = express_1.default.Router();
const locationInstance = new location_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// add  a location
locationRouter.post('/', authMiddleware.verifyUser, authMiddleware.verifyAdmin, locationInstance.createLocation);
// update a location
locationRouter.put('/:id');
// delete a location
locationRouter.delete('/:id');
// get all locations list
locationRouter.get('/', locationInstance.allLocation);
// get a single location
locationRouter.get('/:id', locationInstance.singleLocation);
exports.default = locationRouter;
