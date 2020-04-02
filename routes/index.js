import auth from './auth';
import users from './users';
import articles from './articles';
import categories from './categories';
import home from './home';

export default (app) => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/articles', articles);
  app.use('/api/categories', categories);
  app.use('/api/home', home);
};
