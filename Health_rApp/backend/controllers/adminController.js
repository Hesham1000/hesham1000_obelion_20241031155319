const Sequelize = require('sequelize');
const { Admin } = require('../models/Admin');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

async function getBookings(req, res) {
  try {
    const bookings = await Admin.findAll({
      where: { type: 'booking' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

async function getSystemAlerts(req, res) {
  try {
    const alerts = await Admin.findAll({
      where: { type: 'alert' }
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch system alerts' });
  }
}

async function getConfigurations(req, res) {
  try {
    const configurations = await Admin.findAll({
      where: { type: 'configuration' }
    });
    res.json(configurations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch configurations' });
  }
}

async function updateConfiguration(req, res) {
  const { key, value } = req.body;
  try {
    await Admin.update(
      { value },
      { where: { key, type: 'configuration' } }
    );
    res.status(200).json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update configuration' });
  }
}

module.exports = {
  getBookings,
  getSystemAlerts,
  getConfigurations,
  updateConfiguration,
};
