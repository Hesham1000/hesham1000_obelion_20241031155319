module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('appointments', [
    {
      provider_id: '',
      slot: ''
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('appointments', null, {})
};
