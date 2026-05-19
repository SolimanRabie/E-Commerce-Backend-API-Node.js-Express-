/* eslint-disable import/no-unresolved */
//****** imports start********* */
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');

// eslint-disable-next-line node/no-missing-require
const { v4: uuidv4 } = require('uuid');

const Category = require('../models/categoryModel');
const Factory = require('./handlerFactory');
const ApiError = require('../utils/apiError');

//****** imports End********* */

//****** Multer Uploades Start *********/
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories');
  },
  filename: function (req, file, cb) {
    // category-${id}-Date.now().jpeg
    const exe = file.mimetype.split('/')[1];
    const fileName = `category-${uuidv4()}-${Date.now()}.${exe}`;
    cb(null, fileName);
  },
});

const multerFilter = function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError('only image Allowed ', 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCategoryImage = upload.single('image');
//****** Multer Uploades End *********/

//****** Get Categories start********/
// @ Route Get /api/v1/categories
// @ Access Public
exports.getCategories = Factory.getAll(Category);
//****** Get Categories End********/

//****** Get Spicified Category Start*******/
// @ Route Get /api/v1/Categories/:id
// @ Access Public
exports.getCategory = Factory.getOne(Category);
//****** Get Spicified Category End*******/

//******* Create Catrogry start*********/
// @ Route Post /api/v1/category
// @ Access Private
exports.createCategory = Factory.createOne(Category);
//******* Create Category End*********/

//******* Update Category Start*******/
// @ Route Put /api/v1/Categories/:id
// @ Access Private
exports.updateCategory = Factory.updateOne(Category);

//******* Update Category End*******/

//******* Delete Category Start*******/
// @ Route post /api/v1/Categories/:id
// @ Access Private
exports.deleletedCategory = Factory.deleteOne(Category);
//******* Delete Category End*******/
