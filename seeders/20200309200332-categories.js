
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      id: 1,
      name: 'Yangiliklar',
    },
    {
      id: 2,
      name: 'Marketing',
    },
    {
      id: 3,
      name: 'HR',
    },
    {
      id: 4,
      name: 'Moliya',
    },
    {
      id: 5,
      name: 'Texnologiya',
    },
    {
      id: 6,
      name: 'Shaxsiy Rivojlanish',
    },
    {
      id: 7,
      name: 'Menejment',
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, false),
};
