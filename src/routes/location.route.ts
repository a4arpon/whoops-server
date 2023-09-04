import express, { Router } from 'express';

const locationRouter: Router = express.Router();

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

export default locationRouter;
