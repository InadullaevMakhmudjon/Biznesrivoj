import documentation from './swagger.json';

export default {
  ...documentation,
  host: process.env.BASE_URL,
};
