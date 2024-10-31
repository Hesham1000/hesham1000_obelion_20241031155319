const { Sequelize } = require('sequelize');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Database connection
const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

async function searchProviders(req, res) {
  try {
    const { specialty, location } = req.query;
    
    const providers = await sequelize.query(
      'SELECT * FROM providers WHERE specialty LIKE :specialty AND location LIKE :location',
      {
        replacements: { specialty: `%${specialty}%`, location: `%${location}%` },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for providers' });
  }
}

async function getProviderSlots(req, res) {
  try {
    const { providerId } = req.params;

    const slots = await sequelize.query(
      'SELECT * FROM slots WHERE provider_id = :providerId',
      {
        replacements: { providerId },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving slots' });
  }
}

async function bookAppointment(req, res) {
  try {
    const { patientId, providerId, slot } = req.body;

    await sequelize.query(
      'INSERT INTO appointments (patient_id, provider_id, slot) VALUES (:patientId, :providerId, :slot)',
      {
        replacements: { patientId, providerId, slot },
        type: Sequelize.QueryTypes.INSERT
      }
    );

    res.json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while booking the appointment' });
  }
}

module.exports = {
  searchProviders,
  getProviderSlots,
  bookAppointment
};