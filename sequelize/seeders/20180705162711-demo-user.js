'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: "John",
        lastName: "Doe",
        email: "John_Doe@mail.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
