import auth from './auth';

export default (app) => {
  app.use('/api/auth', auth);
};
