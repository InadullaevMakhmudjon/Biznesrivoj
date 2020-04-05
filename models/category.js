module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  Category.associate = (models) => {
    Category.belongsToMany(models.Article, {
      onDelete: 'CASCADE',
      as: 'articles',
      through: 'ArticleCategories',
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
