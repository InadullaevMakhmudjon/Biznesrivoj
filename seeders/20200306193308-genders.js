module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Genders', [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Genders', null, false),
};
