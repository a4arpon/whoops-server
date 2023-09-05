import express, { Router } from 'express';

const spotRouter: Router = express.Router();

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

export default spotRouter;
