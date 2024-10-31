const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

router.get('/notifications', notificationController.getNotifications);
router.post('/notifications', notificationController.createNotification);
router.put('/notifications/:id', notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;
