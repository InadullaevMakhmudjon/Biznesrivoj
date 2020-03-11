
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Articles', [
    {
      id: 1,
      UserId: 1,
      metaFields: 'metaFields',
      slug: 'slug_1',
      title_uz: 'TitleUz',
      title_ru: 'TitleRu',
      body_uz: 'BodyUz',
      body_ru: 'BodyRu',
      description_uz: 'DescUz',
      description_ru: 'DeskRu',
      views: 0,
      likes: 0,
    },
    {
      id: 2,
      UserId: 1,
      metaFields: 'metaFields22',
      slug: 'slug_1_22',
      title_uz: 'TitleUz22',
      title_ru: 'TitleRu22',
      body_uz: 'BodyUz22',
      body_ru: 'BodyRu22',
      description_uz: 'DescUz22',
      description_ru: 'DeskRu22',
      views: 0,
      likes: 0,
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Articles', null, false),
};
