
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      id: 1,
      name: 'nodejs',
    },
    {
      id: 2,
      name: 'java',
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, false),
};
