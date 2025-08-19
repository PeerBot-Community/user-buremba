const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['apartment', 'house', 'condo', 'villa', 'cabin', 'loft', 'other']
  },
  roomType: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['entire_place', 'private_room', 'shared_room']
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: [0, 'Cleaning fee cannot be negative']
    },
    serviceFee: {
      type: Number,
      default: 0,
      min: [0, 'Service fee cannot be negative']
    }
  },
  capacity: {
    guests: {
      type: Number,
      required: [true, 'Guest capacity is required'],
      min: [1, 'Must accommodate at least 1 guest']
    },
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
      min: [0, 'Bedrooms cannot be negative']
    },
    beds: {
      type: Number,
      required: [true, 'Number of beds is required'],
      min: [1, 'Must have at least 1 bed']
    },
    bathrooms: {
      type: Number,
      required: [true, 'Number of bathrooms is required'],
      min: [1, 'Must have at least 1 bathroom']
    }
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'kitchen', 'parking', 'pool', 'hot_tub', 'gym', 'air_conditioning',
      'heating', 'tv', 'washer', 'dryer', 'pets_allowed', 'smoking_allowed',
      'balcony', 'garden', 'fireplace', 'workspace'
    ]
  }],
  images: [{
    url: { type: String, required: true },
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  availability: {
    checkIn: {
      type: String,
      required: true,
      default: '15:00'
    },
    checkOut: {
      type: String,
      required: true,
      default: '11:00'
    },
    minStay: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Minimum stay must be at least 1 night']
    },
    maxStay: {
      type: Number,
      default: 365
    }
  },
  houseRules: [{
    type: String,
    maxlength: [200, 'House rule cannot be more than 200 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  }
}, {
  timestamps: true
});

// Index for location-based searches
propertySchema.index({ 'address.coordinates': '2dsphere' });
propertySchema.index({ 'address.city': 1, 'address.country': 1 });
propertySchema.index({ host: 1 });
propertySchema.index({ isActive: 1 });

module.exports = mongoose.model('Property', propertySchema);