const SubCategory = require('../models/subCategoryModel');
const Factory = require('./handlerFactory');
//****** create filterd objsct start********/
// @ Route Get /api/v1/:categoryId/subcategories
// @ Access reject --> for "nested route"
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
//****** create filterd objsct End********/

//****** Get subCategories start********/
// @ Route Get /api/v1/subcategories
// @ Access Public
exports.getSubCategories = Factory.getAll(SubCategory);
//****** Get subCategories End********/

//****** Get Spicified subCategory Start*******/
// @ Route Get /api/v1/subcategories/:id
// @ Access Public
exports.getSubCategory = Factory.getOne(SubCategory);
//****** Get Spicified subCategory End*******/

//******* set Category ID to Body start*********/
// @ Route Post /api/v1/:categoryId/subcategories
// @ Access  reject --> for "nested route"
exports.setCategoryIdToBody = (req, res, next) => {
  // for nested routes
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
//******* set Category ID to Body End*********/

//******* Create subCatrogry start*********/
// @ Route Post /api/v1/subcategories
// @ Access Private
exports.createSubCategory = Factory.createOne(SubCategory);
//******* Create subCategory End*********/

//******* Update subCategory Start*******/
// @ Route Put /api/v1/subcategories/:id
// @ Access Private
exports.updateSubCategory = Factory.updateOne(SubCategory);
//******* Update subCategory End*******/

//******* Delete subCategory Start*******/
// @ Route post /api/v1/subcategories/:id
// @ Access Private
exports.deleletedSubCategory = Factory.deleteOne(SubCategory);
//******* Delete subCategory End*******/
