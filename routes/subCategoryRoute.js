const express = require('express');

const router = express.Router({ mergeParams: true });

//******** Import start *********/
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleletedSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require('../services/subCategoryService');

//******** Import End *********/

//*******validation middelware start*****//
const {
  createSubCategoryValidator,
  getsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');
//*******validation middelware End*****//

router
  .route('/')
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getsubCategoryValidator, getSubCategory)
  .put(updatesubCategoryValidator, updateSubCategory)
  .delete(deletesubCategoryValidator, deleletedSubCategory);

module.exports = router;
