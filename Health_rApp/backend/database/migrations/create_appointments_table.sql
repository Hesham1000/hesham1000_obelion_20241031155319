const { Model } = require('sequelize');

class Appointment extends Model {
  static init(sequelize) {
    super.init({
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

module.exports = Appointment;
