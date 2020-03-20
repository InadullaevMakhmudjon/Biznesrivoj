module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  Category.associate = (models) => {
    Category.belongsToMany(models.Article, {
      onDelete: 'CASCADE',
      hooks: true,
      as: 'articles',
      through: 'ArticleCategories',
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
