/* eslint-disable import/no-unresolved */
//****** imports start********* */
const multer = require('multer');
const asyncHandler = require('express-async-handler');

const { v4: uuidv4 } = require('uuid');

const Factory = require('./handlerFactory');
const ApiError = require('../utils/apiError');
const { uploadSingleImage } = require('../middelWares/uploadImageMiddelware');
const Category = require('../models/categoryModel');

// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const sharp = require('sharp');

//****** imports End********* */

//****** Multer Uploades Start *********/
exports.uploadCategoryImage = uploadSingleImage('image');
//****** Multer Uploades End *********/

//***** Sharp Middelware for resizing Start******/
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  // Save Image in DB
  req.body.image = fileName;
  next();
});
//***** Sharp Middelware for resizing End******/

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
