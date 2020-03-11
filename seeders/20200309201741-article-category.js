
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('ArticleCategories', [
    {
      categoryId: 1,
      articleId: 2,
    },
    {
      categoryId: 2,
      articleId: 1,
    },
    {
      categoryId: 1,
      articleId: 1,
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('ArticleCategories', null, false),
};
