const mongoose = require('mongoose');

const subagentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be longer than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be longer than 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['general-purpose', 'statusline-setup', 'output-style-setup'],
      message: 'Invalid subagent type'
    }
  },
  capabilities: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

subagentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Subagent = mongoose.model('Subagent', subagentSchema);

module.exports = Subagent;