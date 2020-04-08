module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    metaFields: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING(250),
      unique: true,
    },
    title_uz: {
      type: Sequelize.STRING,
    },
    title_ru: {
      type: Sequelize.STRING,
    },
    body_uz: {
      type: Sequelize.TEXT,
    },
    body_ru: {
      type: Sequelize.TEXT,
    },
    description_uz: {
      type: Sequelize.STRING,
    },
    description_ru: {
      type: Sequelize.STRING,
    },
    views: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    likes: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Articles'),
};
