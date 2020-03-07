module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Roles', [
    {
      id: 1,
      name: 'Admin',
    },
    {
      id: 2,
      name: 'Editor',
    },
    {
      id: 3,
      name: 'User',
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, false),
};
