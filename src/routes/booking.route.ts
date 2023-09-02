import express from 'express';

const bookingRouter = express.Router();

// Get all booking
bookingRouter.get('/');
// Get all booking for specific user
bookingRouter.get('/:id/users/:id');
// get booking for user
bookingRouter.get('/users/:id');
// add booking
bookingRouter.post('/users/:id/tour_package/:id');
// Delete booking
bookingRouter.delete('/users/:id/tour_package/:id');

export default bookingRouter;
