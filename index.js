import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));

app.use(express.static('static'));
app.use('', routes);

// error handler
app.use((err, req, res, next) => {
  // render the error
  console.log(err);
  res.status(err.status || 500);
  res.json(err.body || {
    statusCode: 500,
  	error: 'Server could not complete request',
  });
  next();
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
