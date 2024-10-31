const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      modelName: 'Appointment',
    });
  }
}

class NotificationUtils {
  static async notifyAppointmentBooked(userEmail, appointmentDetails) {
    try {
      console.log(`Notification sent to ${userEmail}:`, appointmentDetails);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}

module.exports = { Appointment, NotificationUtils };