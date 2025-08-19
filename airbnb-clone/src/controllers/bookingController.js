const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');

const bookingController = {
  // Create a new booking
  createBooking: async (req, res) => {
    try {
      const {
        propertyId,
        checkIn,
        checkOut,
        guests,
        specialRequests
      } = req.body;

      // Validate required fields
      if (!propertyId || !checkIn || !checkOut || !guests?.adults) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: propertyId, checkIn, checkOut, and guests.adults'
        });
      }

      // Validate dates
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        return res.status(400).json({
          success: false,
          message: 'Check-in date cannot be in the past'
        });
      }

      if (checkOutDate <= checkInDate) {
        return res.status(400).json({
          success: false,
          message: 'Check-out date must be after check-in date'
        });
      }

      // Get property details
      const property = await Property.findById(propertyId).populate('host');
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found'
        });
      }

      // Check if property is available for the dates
      const conflictingBookings = await Booking.find({
        property: propertyId,
        status: { $in: ['confirmed', 'pending'] },
        $or: [
          {
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate }
          }
        ]
      });

      if (conflictingBookings.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Property is not available for the selected dates'
        });
      }

      // Check guest capacity
      const totalGuests = guests.adults + (guests.children || 0) + (guests.infants || 0);
      if (totalGuests > property.capacity.maxGuests) {
        return res.status(400).json({
          success: false,
          message: `Property can accommodate maximum ${property.capacity.maxGuests} guests`
        });
      }

      // Calculate pricing
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const subtotal = property.pricing.basePrice * nights;
      const cleaningFee = property.pricing.cleaningFee || 0;
      const serviceFee = Math.round(subtotal * 0.14); // 14% service fee
      const taxes = Math.round((subtotal + serviceFee) * 0.12); // 12% taxes
      const total = subtotal + cleaningFee + serviceFee + taxes;

      // Create booking
      const booking = new Booking({
        property: propertyId,
        guest: req.user.id,
        host: property.host._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: {
          adults: guests.adults,
          children: guests.children || 0,
          infants: guests.infants || 0
        },
        pricing: {
          basePrice: property.pricing.basePrice,
          nights,
          subtotal,
          cleaningFee,
          serviceFee,
          taxes,
          total,
          currency: property.pricing.currency || 'USD'
        },
        specialRequests: specialRequests || '',
        status: 'pending',
        paymentStatus: 'pending'
      });

      await booking.save();

      // Populate booking for response
      await booking.populate([
        { path: 'property', select: 'title images location' },
        { path: 'guest', select: 'firstName lastName email' },
        { path: 'host', select: 'firstName lastName email' }
      ]);

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking
      });

    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create booking',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get user's bookings
  getUserBookings: async (req, res) => {
    try {
      const { status, type = 'guest' } = req.query;
      const userId = req.user.id;

      let query = {};
      if (type === 'guest') {
        query.guest = userId;
      } else if (type === 'host') {
        query.host = userId;
      }

      if (status) {
        query.status = status;
      }

      const bookings = await Booking.find(query)
        .populate('property', 'title images location pricing')
        .populate('guest', 'firstName lastName email')
        .populate('host', 'firstName lastName email')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: bookings
      });

    } catch (error) {
      console.error('Get user bookings error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get specific booking
  getBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const booking = await Booking.findById(id)
        .populate('property')
        .populate('guest', 'firstName lastName email phone')
        .populate('host', 'firstName lastName email phone');

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Check if user is authorized to view this booking
      if (booking.guest._id.toString() !== userId && booking.host._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this booking'
        });
      }

      res.json({
        success: true,
        data: booking
      });

    } catch (error) {
      console.error('Get booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch booking',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const userId = req.user.id;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Check if user can cancel this booking
      if (booking.guest.toString() !== userId && booking.host.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to cancel this booking'
        });
      }

      // Check if booking can be cancelled
      if (booking.status === 'cancelled' || booking.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Booking cannot be cancelled'
        });
      }

      // Update booking status
      booking.status = 'cancelled';
      booking.cancellation = {
        cancelledBy: userId,
        cancelledAt: new Date(),
        reason: reason || 'No reason provided'
      };

      // Calculate refund amount based on cancellation policy
      const checkInDate = new Date(booking.checkIn);
      const now = new Date();
      const daysUntilCheckIn = Math.ceil((checkInDate - now) / (1000 * 60 * 60 * 24));
      
      let refundPercentage = 0;
      if (daysUntilCheckIn >= 7) {
        refundPercentage = 100; // Full refund if cancelled 7+ days before
      } else if (daysUntilCheckIn >= 1) {
        refundPercentage = 50; // 50% refund if cancelled 1-6 days before
      }

      booking.cancellation.refundAmount = Math.round(booking.pricing.total * (refundPercentage / 100));
      await booking.save();

      res.json({
        success: true,
        message: 'Booking cancelled successfully',
        data: {
          booking,
          refundAmount: booking.cancellation.refundAmount
        }
      });

    } catch (error) {
      console.error('Cancel booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to cancel booking',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Confirm booking (host only)
  confirmBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Check if user is the host
      if (booking.host.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Only the host can confirm this booking'
        });
      }

      // Check if booking can be confirmed
      if (booking.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Only pending bookings can be confirmed'
        });
      }

      booking.status = 'confirmed';
      await booking.save();

      await booking.populate([
        { path: 'property', select: 'title images location' },
        { path: 'guest', select: 'firstName lastName email' }
      ]);

      res.json({
        success: true,
        message: 'Booking confirmed successfully',
        data: booking
      });

    } catch (error) {
      console.error('Confirm booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to confirm booking',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = bookingController;