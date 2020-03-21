import documentation from './swagger.json';

export default {
  ...documentation,
  host: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'localhost:3030',
};
