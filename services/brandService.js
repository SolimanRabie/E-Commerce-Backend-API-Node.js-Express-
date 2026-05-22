//****** imports start********* */
const asyncHandler = require('express-async-handler');
const Factory = require('./handlerFactory');
const { uploadSingleImage } = require('../middelWares/uploadImageMiddelware');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const Brand = require('../models/brandModel');
//****** imports End********* */

//****** Multer Uploades Start *********/
exports.uploadBrandImage = uploadSingleImage('image');
//****** Multer Uploades End *********/

//***** Sharp Middelware for resizing Start******/
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);

  // Save Image in DB
  req.body.image = fileName;
  next();
});
//***** Sharp Middelware for resizing End******/

//****** Get Brands start********/
// @ Route Get /api/v1/brands
// @ Access Public
exports.getBrands = Factory.getAll(Brand);
//****** Get brands End********/

//****** Get Spicified brand Start*******/
// @ Route Get /api/v1/brands/:id
// @ Access Public
exports.getBrand = Factory.getOne(Brand);
//****** Get Spicified brand End*******/

//******* Create Brand start*********/
// @ Route Post /api/v1/brands
// @ Access Private
exports.createBrand = Factory.createOne(Brand);
//******* Create Brand End*********/

//******* Update Brand Start*******/
// @ Route Put /api/v1/brands/:id
// @ Access Private
exports.updateBrand = Factory.updateOne(Brand);

//******* Update Brand End*******/

//******* Delete Brand Start*******/
// @ Route post /api/v1/brands/:id
// @ Access Private
exports.deletebrand = Factory.deleteOne(Brand);
//******* Delete Brand End*******/
