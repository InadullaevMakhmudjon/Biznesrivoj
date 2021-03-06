
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    secondname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    quote: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dateOfBirth: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    roleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    genderId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Genders',
        key: 'id',
      },
    },
    lastLoggedIn: {
      type: Sequelize.DATE,
    },
    lastLoggedOut: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
