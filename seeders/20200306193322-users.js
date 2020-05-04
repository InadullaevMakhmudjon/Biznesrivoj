const { hashSync } = require('bcryptjs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      firstname: 'User',
      secondname: 'User',
      phone: '-',
      password: '-',
      genderId: 1,
      image: '-',
      quote: '-',
      dateOfBirth: new Date('01-01-2020'),
      roleId: 3,
      createdAt: new Date(),
    },
    {
      id: 2,
      firstname: 'Admin',
      secondname: 'Admin',
      phone: '+998994287668',
      password: hashSync('admin', 7),
      genderId: 1,
      image: 'https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg',
      quote: "Solve the problem, or Leave the problem, but don't sleep with problem",
      dateOfBirth: new Date('01-01-2020'),
      roleId: 1,
      createdAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, false),
};
