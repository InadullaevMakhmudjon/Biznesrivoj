
module.exports = (sequelize, DataTypes) => {
  const ArticleCategory = sequelize.define('ArticleCategory', {
    categoryId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
  }, {});
  ArticleCategory.associate = () => {};
  return ArticleCategory;
};
