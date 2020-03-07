const { hashSync } = require('bcryptjs');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      fullName: 'Admin',
      phone: '+998123456789',
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
