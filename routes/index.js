import auth from './auth';
import users from './users';
import articles from './articles';
import categories from './categories';
import home from './home';
import files from './files';
import verify from './verify';
import bookmarks from './bookmarks';

export default (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/articles', articles);
  app.use('/categories', categories);
  app.use('/home', home);
  app.use('/files', files);
  app.use('/verify', verify);
  app.use('/bookmarks', bookmarks);
};
