const asyncHandler = require('express-async-handler');
const multer = require('multer');
// eslint-disable-next-line import/no-unresolved
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');
// eslint-disable-next-line import/order
const sharp = require('sharp');

//****** imports start********* */
const Product = require('../models/productModel');
const Factory = require('./handlerFactory');
const { uploadMixOfImages } = require('../middelWares/uploadImageMiddelware');
//****** imports End********* */

exports.uploadProductsImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

// resize
//***** Sharp Middelware for resizing Start******/
exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  // image proccing for image cover
  if (req.files.imageCover) {
    console.log(req.files);
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save Image in DB
    req.body.imageCover = imageCoverFileName;
  }

  // image proccing for images
  if (req.files.images) {
    req.body.images = await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);
        // Save Image in DB
        return imageName;
      }),
    );
    console.log(req.body.imageCover);
    console.log(req.body.images);
  }
  next();
});
//***** Sharp Middelware for resizing End******/

//****** Get Products start********/
// @ Route Get /api/v1/Products
// @ Access Public
exports.getProducts = Factory.getAll(Product, 'products');
//****** Get Products End********/

//****** Get Spicified Product Start*******/
// @ Route Get /api/v1/Products/:id
// @ Access Public
exports.getProduct = Factory.getOne(Product);
//****** Get Spicified Product End*******/

//******* Create Product start*********/
// @ Route Post /api/v1/Products
// @ Access Private
exports.createProduct = Factory.createOne(Product);
//******* Create Product End*********/

//******* Update Product Start*******/
// @ Route Put /api/v1/Products/:id
// @ Access Private
exports.updateProduct = Factory.updateOne(Product);

//******* Update Product End*******/

//******* Delete Product Start*******/
// @ Route post /api/v1/Product/:id
// @ Access Private
exports.deleletedProduct = Factory.deleteOne(Product);
//******* Delete product End*******/
