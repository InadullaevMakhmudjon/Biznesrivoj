
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    UserId: DataTypes.INTEGER,
    metaFields: DataTypes.STRING,
    slug: DataTypes.STRING,
    title_uz: DataTypes.STRING,
    title_ru: DataTypes.STRING,
    body_uz: DataTypes.STRING,
    body_ru: DataTypes.STRING,
    description_uz: DataTypes.STRING,
    description_ru: DataTypes.STRING,
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, { as: 'creator', foreignKey: 'UserId' });
    Article.belongsToMany(models.Category, { as: 'categories', through: 'ArticleCategories', foreignKey: 'articleId' });
  };
  return Article;
};
