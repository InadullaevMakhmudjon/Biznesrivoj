module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    desc_uz: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    desc_kr: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Categories'),
};
