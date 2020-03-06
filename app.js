import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

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
