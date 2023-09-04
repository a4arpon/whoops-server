import express, { Router } from 'express';

const paymentRouter: Router = express.Router();

// add  a payment for user
paymentRouter.post('/bookings/:id/users/:id');

// update all payments for user
paymentRouter.get('/users/:id');

//  update a payment for user
paymentRouter.get('/:id/users/:id');

// get all payment list
paymentRouter.get('/');

export default paymentRouter;
