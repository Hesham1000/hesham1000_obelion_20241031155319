const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Patient extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      modelName: 'Patient',
      timestamps: false,
      hooks: {
        beforeCreate: async (patient) => {
          patient.password = await hashPassword(patient.password);
        },
      },
    });
  }

  static associate(models) {
    this.hasMany(models.Appointment, { foreignKey: 'patient_id', as: 'appointments' });
  }
}

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slot: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Appointment',
    });
  }
}

async function hashPassword(password) {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

module.exports = { Patient, Appointment };