const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;

    await sequelize.authenticate({
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Health_rApp',
    });

    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
