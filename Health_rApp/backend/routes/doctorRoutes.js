const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Middleware to check database connection
router.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Database connection failed' });
  }
});

// Define API endpoints

// GET /api/doctor/availability - Retrieve doctor's availability
router.get('/availability', async (req, res) => {
  try {
    // Logic to retrieve availability goes here
    res.status(200).json({ message: 'Availability fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// POST /api/doctor/availability - Set doctor's availability
router.post('/availability', async (req, res) => {
  try {
    const { day, time, isAvailable } = req.body;

    // Validate request data
    if (!day || !time || typeof isAvailable !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Logic to set availability goes here
    res.status(201).json({ message: 'Availability set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set availability' });
  }
});

// PUT /api/doctor/availability - Update doctor's availability
router.put('/availability', async (req, res) => {
  try {
    const { day, time, isAvailable } = req.body;

    // Validate request data
    if (!day || !time || typeof isAvailable !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Logic to update availability goes here
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// DELETE /api/doctor/availability - Delete doctor's availability
router.delete('/availability', async (req, res) => {
  try {
    const { day, time } = req.body;

    // Validate request data
    if (!day || !time) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Logic to delete availability goes here
    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete availability' });
  }
});

module.exports = router;
