// File Type: Controller

const { Doctor } = require('../models/Doctor');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const setAvailability = async (req, res) => {
  try {
    const { doctorId, availability } = req.body;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    doctor.availability = availability;
    await doctor.save();
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating availability' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ notifications: doctor.notifications });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
};

module.exports = {
  setAvailability,
  getNotifications,
};
