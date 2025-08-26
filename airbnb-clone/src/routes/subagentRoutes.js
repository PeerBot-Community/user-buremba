const express = require('express');
const { validateSubagent, createSubagent, getSubagents } = require('../controllers/subagentController');

const router = express.Router();

router.post('/', validateSubagent, createSubagent);
router.get('/', getSubagents);

module.exports = router;