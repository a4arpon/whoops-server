import express, { Router } from 'express';

const tourPackageRouter: Router = express.Router();

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

export default tourPackageRouter;
