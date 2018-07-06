'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
            name: "some product",
            state: false,
            card: 23,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, {});
    }
};
