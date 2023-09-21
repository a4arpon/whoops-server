import express, { Router } from 'express';

const resortsRouter: Router = express.Router();

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

export default resortsRouter;
