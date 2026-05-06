const express = require('express');
const router = express.Router();

//******** Import start *********/
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleletedCategory,
} = require('../services/categoryService');

//*******validation middelware start*****//
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');
//*******validation middelware start*****//

//******** Import End *********/

//********* Routes Start***********//
//**Routre '/' Start***/
router
  .route('/')
  .get(getCategories) //** get getCategories */
  .post(createCategoryValidator, createCategory); //** Create category */
//**Routre '/' End***/

//**Route '/:id'  Start***/
router
  .route('/:id')
  .get(getCategoryValidator, getCategory) //** get spicified category */
  .put(updateCategoryValidator, updateCategory) //**Update Category
  .delete(deleteCategoryValidator, deleletedCategory); //**Delete Category
//**Route '/:id' End***/

//********* Routes end***********//

module.exports = router;
