const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');

const SubCategory = require('../models/subCategoryModel');

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
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // * 1 => to convert it to number
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  console.log(req.params);

  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  // .populate({ path: 'category', select: 'name -_id' });
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});
//****** Get subCategories End********/

//****** Get Spicified subCategory Start*******/
// @ Route Get /api/v1/subcategories/:id
// @ Access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });
  if (!subCategory) {
    // res.status(404).json({ msg: "cat'n find this category of id : ", id });
    return next(new ApiError(`cat'n find this subcategory of id : ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
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
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  console.log('name: ', name, category);
  const subCategory = await SubCategory.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subCategory });
});
//******* Create subCategory End*********/

//******* Update subCategory Start*******/
// @ Route Put /api/v1/subcategories/:id
// @ Access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true },
  );

  if (!subCategory) {
    return next(new ApiError(`cat'n find this subcategory of id : ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
//******* Update subCategory End*******/

//******* Delete subCategory Start*******/
// @ Route post /api/v1/subcategories/:id
// @ Access Private
exports.deleletedSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  console.log('category', subCategory);
  if (!subCategory) {
    return next(new ApiError(`cat'n find this category of id : ${id}`, 404));
  }
  res.status(204).send();
});
//******* Delete subCategory End*******/
