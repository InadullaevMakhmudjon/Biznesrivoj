import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs';
import indexRouter from './routes/index';
import './config/passport';

const app = express();

const whitelist = ['http://localhost:3000', 'http://makhmudjon.me', 'http://dev.makhmudjon.me'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', cors());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
indexRouter(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
