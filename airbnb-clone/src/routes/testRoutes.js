const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();

router.post('/test', async (req, res) => {
  await testController.executeTestAction(req, res);
});

router.get('/test/health', async (req, res) => {
  req.body = { action: 'health' };
  await testController.executeTestAction(req, res);
});

router.post('/test/validate', async (req, res) => {
  req.body = { action: 'validate' };
  await testController.executeTestAction(req, res);
});

module.exports = router;