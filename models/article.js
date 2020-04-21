
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    UserId: DataTypes.INTEGER,
    metaFields: DataTypes.STRING,
    slug: DataTypes.STRING,
    title_uz: DataTypes.STRING,
    title_kr: DataTypes.STRING,
    body_uz: DataTypes.TEXT,
    body_kr: DataTypes.TEXT,
    description_uz: DataTypes.STRING,
    description_kr: DataTypes.STRING,
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, { as: 'creator', foreignKey: 'UserId' });
    Article.belongsToMany(models.Category, {
      onDelete: 'SETNULL',
      as: 'categories',
      through: 'ArticleCategories',
      foreignKey: 'articleId',
    });
  };
  return Article;
};
