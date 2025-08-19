const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate, authorize } = require('../middleware/auth');

// POST /api/bookings - Create a new booking
router.post('/', authenticate, bookingController.createBooking);

// GET /api/bookings - Get user's bookings
router.get('/', authenticate, bookingController.getUserBookings);

// GET /api/bookings/:id - Get specific booking
router.get('/:id', authenticate, bookingController.getBooking);

// PATCH /api/bookings/:id/cancel - Cancel booking
router.patch('/:id/cancel', authenticate, bookingController.cancelBooking);

// PATCH /api/bookings/:id/confirm - Confirm booking (host only)
router.patch('/:id/confirm', authenticate, authorize(['host', 'admin']), bookingController.confirmBooking);

module.exports = router;