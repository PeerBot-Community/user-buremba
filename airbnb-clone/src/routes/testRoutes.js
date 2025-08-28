const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();

router.post('/', async (req, res) => {
  await testController.executeTestAction(req, res);
});

router.get('/health', async (req, res) => {
  req.body = { action: 'health' };
  await testController.executeTestAction(req, res);
});

router.post('/validate', async (req, res) => {
  req.body = { action: 'validate' };
  await testController.executeTestAction(req, res);
});

module.exports = router;