function sort(obj) {
  let result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result = { order: [[key, obj[key]]] };
    }
  });
  return result;
}

function toObject(obj, keys) {
  if (!obj) return {};
  const result = {};
  keys.forEach((key) => { result[key] = obj[key]; });
  return result;
}

export const dynamicSort = (query, keys) => sort(toObject(query, keys));

export const paginate = ({ page, limit }) => ((page && limit) ? {
  offset: ((page - 1) > 0 ? (page - 1) : 0) * limit,
  limit,
} : {});

export const types = {
  ARTICLE: ['views', 'likes', 'createdAt'],
  USER: ['createdAt'],
};
