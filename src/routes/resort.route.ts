import express, { Router } from 'express';

const resortsRouter: Router = express.Router();

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

export default resortsRouter;
