const express = require('express');

const router = express.Router();

//******** Import start *********/
const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deletebrand,
  uploadBrandImage,
  resizeImage,
} = require('../services/brandService');

//*******validation middelware start*****//
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');
//*******validation middelware start*****//

//******* Nested Route Start********/
const subCategoriesRoute = require('./subCategoryRoute');
//******* Nested Route End********/

//******** Import End *********/

//********* Routes Start***********//
router.use('/:categoryId/subcategories', subCategoriesRoute);

//**Routre '/' Start***/
router
  .route('/')
  .get(getBrands) //** get getBrands */
  .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand); //** Create category */
//**Routre '/' End***/

//**Route '/:id'  Start***/
router
  .route('/:id')
  .get(getBrandValidator, getBrand) //** get spicified Brand */
  .put(uploadBrandImage, resizeImage, updateBrandValidator, updateBrand) //**Update Brand
  .delete(deleteBrandValidator, deletebrand); //**Delete Brand
//**Route '/:id' End***/

//********* Routes end***********//

module.exports = router;
