import auth from './auth';
import users from './users';

export default app => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
}