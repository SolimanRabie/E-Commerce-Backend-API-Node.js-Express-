const express = require('express');

const router = express.Router();

//******** Import start *********/
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleletedCategory,
  uploadCategoryImage,
  resizeImage,
} = require('../services/categoryService');

//*******validation middelware start*****//
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');
//*******validation middelware End*****//

//******* Nested Route Start********/
const subCategoriesRoute = require('./subCategoryRoute');
//******* Nested Route End********/

//******** Import End *********/

//********* Routes Start***********//
router.use('/:categoryId/subcategories', subCategoriesRoute);

//**Routre '/' Start***/
router
  .route('/')
  .get(getCategories) //** get getCategories */
  .post(
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
  ); //** Create category */
//**Routre '/' End***/

//**Route '/:id'  Start***/
router
  .route('/:id')
  .get(getCategoryValidator, getCategory) //** get spicified category */
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory,
  ) //**Update Category
  .delete(deleteCategoryValidator, deleletedCategory); //**Delete Category
//**Route '/:id' End***/

//********* Routes end***********//

module.exports = router;
