const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

// Sample controller functions
const bookingsController = require('../controllers/bookingsController');
const systemAlertsController = require('../controllers/systemAlertsController');
const configurationsController = require('../controllers/configurationsController');

// GET /api/bookings
router.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await bookingsController.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET /api/system-alerts
router.get('/api/system-alerts', async (req, res) => {
  try {
    const alerts = await systemAlertsController.getAllAlerts();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch system alerts' });
  }
});

// GET /api/configurations
router.get('/api/configurations', async (req, res) => {
  try {
    const configurations = await configurationsController.getConfigurations();
    res.status(200).json(configurations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch configurations' });
  }
});

// POST /api/configurations
router.post('/api/configurations', async (req, res) => {
  try {
    const { key, value } = req.body;
    await configurationsController.updateConfiguration(key, value);
    res.status(200).json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

module.exports = router;
