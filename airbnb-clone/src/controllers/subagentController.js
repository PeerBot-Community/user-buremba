const Subagent = require('../models/Subagent');
const { body, validationResult } = require('express-validator');

exports.validateSubagent = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot be longer than 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot be longer than 1000 characters'),
  
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['general-purpose', 'statusline-setup', 'output-style-setup'])
    .withMessage('Invalid subagent type'),
  
  body('capabilities')
    .optional()
    .isArray()
    .withMessage('Capabilities must be an array')
];

exports.createSubagent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const subagent = new Subagent(req.body);
    await subagent.save();

    res.status(201).json({
      success: true,
      data: subagent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating subagent'
    });
  }
};

exports.getSubagents = async (req, res) => {
  try {
    const subagents = await Subagent.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      data: subagents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching subagents'
    });
  }
};