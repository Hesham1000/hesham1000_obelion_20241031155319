const express = require('express');
const router = express.Router();
const { Sequelize, Model } = require('sequelize');
const patientController = require('../controllers/patientController');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      slot: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'appointment',
    });
  }
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDB();

router.get('/providers', patientController.getProviders);
router.get('/providers/:providerId/slots', patientController.getProviderSlots);
router.post('/appointments', patientController.bookAppointment);

router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = router;