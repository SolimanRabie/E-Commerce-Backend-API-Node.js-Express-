const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv'); // if the file name is only => .env
const { Error } = require('mongoose');

dotenv.config({ path: './config.env' }); // should be add as the file name is 'config.env'

// ********** import from Start**********//
const globalError = require('./middelWares/errorMiddelware');
const ApiError = require('./utils/apiError');
// ********** import from End**********//

// ********** import DB start******* //
const dbConnection = require('./config/database');
// ********** import DB End******* //

// ********** import Routes start**********//
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productsRoute');
// ********** import Routes End**********//

// express app
const app = express();
app.set('query parser', 'extended'); // for filtering products
// express app
dbConnection();
//********* middelwares start********** *//
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('mode : ', process.env.NODE_ENV);
}
//********* middelwares end********** *//

//********* Mount Routes Start***********//
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);

app.use((req, res, next) => {
  // const err = new Error(`can't find this route : ${req.originalUrl}`);
  next(new ApiError(`can't find this route : ${req.originalUrl}`, 400));
});
//********* Mount Routes End***********//

//The default error handler for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log('app running on port : ', PORT);
});

// Handel rejections outside express
process.on('unhandeledRejection', (err) => {
  console.error(`error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down`);
    process.exit(1);
  });
});
