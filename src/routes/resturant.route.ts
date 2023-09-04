import express, { Router } from 'express';

const restaurantRouter: Router = express.Router();

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

export default restaurantRouter;
