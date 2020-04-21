function sort(obj) {
  let result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result = { order: [[key, obj[key]]] };
    }
  });
  return result;
}

// eslint-disable-next-line max-len
export const categoryArticleSort = ({ views, likes, createdAt }) => sort({ views, likes, createdAt });

export const paginate = ({ page, limit }) => ((page && limit) ? {
  offset: ((page - 1) > 0 ? (page - 1) : 0) * limit,
  limit,
} : {});
