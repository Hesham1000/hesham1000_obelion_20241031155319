const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('Health_rApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Admin extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      }
      // Add more fields as per your requirements
    }, {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      timestamps: false
    });
  }
}

module.exports = Admin;
