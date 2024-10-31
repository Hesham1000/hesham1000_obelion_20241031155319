const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the path as necessary for the db connection

class Doctor extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availability: {
        type: DataTypes.JSON,
        allowNull: true, // To store availability as JSON
      },
    }, {
      sequelize,
      modelName: 'Doctor',
      timestamps: false, // Disable timestamps
    });
  }
}

module.exports = Doctor;
