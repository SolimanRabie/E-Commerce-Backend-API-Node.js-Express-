//****** imports start********* */
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Category = require('../models/categoryModel');

//****** imports End********* */

//****** Get Categories start********/
// @ Route Get /api/v1/categories
// @ Access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // * 1 => to convert it to number
  const limit = req.query.limit * 1 || 0;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});
//****** Get Categories End********/

//****** Get Spicified Category Start*******/
// @ Route Get /api/v1/Categories/:id
// @ Access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    // res.status(404).json({ msg: "cat'n find this category of id : ", id });
    return next(new ApiError(`cat'n find this category of id : ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
//****** Get Spicified Category End*******/

//******* Create Catrogry start*********/
// @ Route Post /api/v1/category
// @ Access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log('name: ', name);
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
//******* Create Category End*********/

//******* Update Category Start*******/
// @ Route Put /api/v1/Categories/:id
// @ Access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!category) {
    return next(new ApiError(`cat'n find this category of id : ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
//******* Update Category End*******/

//******* Delete Category Start*******/
// @ Route post /api/v1/Categories/:id
// @ Access Private
exports.deleletedCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  console.log('category', category);
  if (!category) {
    return next(new ApiError(`cat'n find this category of id : ${id}`, 404));
  }
  res.status(204).send();
});
//******* Delete Category End*******/
