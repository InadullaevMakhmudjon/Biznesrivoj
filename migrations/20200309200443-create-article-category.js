
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    articleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('ArticleCategories'),
};
