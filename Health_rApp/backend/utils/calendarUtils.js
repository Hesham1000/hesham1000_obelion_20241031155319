// File Type: routes

const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

// Establish database connection
const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Ensure database connection is successful
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ', err));

// Endpoint to get availability
router.get('/availability', async (req, res) => {
  try {
    // Logic to fetch availability from the database
    res.status(200).json({ message: 'Availability fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Endpoint to update availability
router.put('/availability', async (req, res) => {
  try {
    const { day, time, isAvailable } = req.body;
    // Logic to update availability in the database
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Endpoint to get notifications
router.get('/notifications', async (req, res) => {
  try {
    // Logic to fetch notifications from the database
    res.status(200).json({ message: 'Notifications fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Endpoint to create a notification
router.post('/notifications', async (req, res) => {
  try {
    const { notification } = req.body;
    // Logic to create a notification in the database
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Export the router
module.exports = router;
