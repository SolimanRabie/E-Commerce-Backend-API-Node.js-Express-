//****** imports start********* */
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Brand = require('../models/brandModel');
const ApiFeatures = require('../utils/apiFeatures');
//****** imports End********* */

//****** Get Brands start********/
// @ Route Get /api/v1/brands
// @ Access Public
exports.getBrands = asyncHandler(async (req, res) => {
  // build query
  const documentsCount = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .filter()
    .paginate(documentsCount)
    .sort()
    .search();

  const { mongooseQuery, paginationResult } = apiFeatures;
  // execute query
  const brands = await mongooseQuery;
  console.log('products', brands);
  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});
//****** Get brands End********/

//****** Get Spicified brand Start*******/
// @ Route Get /api/v1/brands/:id
// @ Access Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: "cat'n find this category of id : ", id });
    return next(new ApiError(`cat'n find this Brand of id : ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
//****** Get Spicified brand End*******/

//******* Create Brand start*********/
// @ Route Post /api/v1/brands
// @ Access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log('name: ', name);
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});
//******* Create Brand End*********/

//******* Update Brand Start*******/
// @ Route Put /api/v1/brands/:id
// @ Access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!brand) {
    return next(new ApiError(`cat'n find this brand of id : ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
//******* Update Brand End*******/

//******* Delete Brand Start*******/
// @ Route post /api/v1/brands/:id
// @ Access Private
exports.deletebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  console.log('brand', brand);
  if (!brand) {
    return next(new ApiError(`cat'n find this Brand of id : ${id}`, 404));
  }
  res.status(204).send();
});
//******* Delete Brand End*******/
