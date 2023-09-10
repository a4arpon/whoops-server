import express, { Router } from 'express';
import LocationController from '../controllers/location.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const locationRouter: Router = express.Router();

const locationInstance = new LocationController();
const authMiddleware = new AuthMiddleware();

// add  a location
locationRouter.post(
  '/',
  authMiddleware.verifyUser,
  authMiddleware.verifyAdmin,
  locationInstance.createLocation
);

// update a location
locationRouter.put('/:id');

// delete a location
locationRouter.delete('/:id');

// get all locations list
locationRouter.get('/', locationInstance.allLocation);

// get a single location
locationRouter.get('/:id', locationInstance.singleLocation);

export default locationRouter;
