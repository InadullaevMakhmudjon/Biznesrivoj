
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
      articleId: 3,
    },
    {
      categoryId: 1,
      articleId: 4,
    },
    {
      categoryId: 1,
      articleId: 5,
    },
    {
      categoryId: 1,
      articleId: 6,
    },
    {
      categoryId: 1,
      articleId: 7,
    },
    {
      categoryId: 1,
      articleId: 8,
    },
    {
      categoryId: 1,
      articleId: 9,
    },
    {
      categoryId: 1,
      articleId: 10,
    },
    {
      categoryId: 1,
      articleId: 11,
    },
    {
      categoryId: 1,
      articleId: 12,
    },
    {
      categoryId: 1,
      articleId: 13,
    },
    {
      categoryId: 1,
      articleId: 14,
    },
    {
      categoryId: 1,
      articleId: 15,
    },
    {
      categoryId: 1,
      articleId: 16,
    },
    {
      categoryId: 1,
      articleId: 17,
    },
    {
      categoryId: 1,
      articleId: 18,
    },
    {
      categoryId: 1,
      articleId: 19,
    },
    {
      categoryId: 1,
      articleId: 20,
    },
    {
      categoryId: 1,
      articleId: 21,
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('ArticleCategories', null, false),
};
