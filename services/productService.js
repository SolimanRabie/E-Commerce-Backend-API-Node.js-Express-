//****** imports start********* */
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const { json } = require('express');
const ApiError = require('../utils/apiError');
const Product = require('../models/productModel');

//****** imports End********* */

//****** Get Products start********/
// @ Route Get /api/v1/Products
// @ Access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Fileting
  const queryStringObj = { ...req.query };
  const execludesFields = ['page', 'limit', 'sort', 'fields'];
  execludesFields.forEach((field) => delete queryStringObj[field]);
  // console.log(req.query);
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // "\b  \b" -> to tell that i want the exacte value for gte|gt ... the same word
  // g -> as if more than one value exist catch all of them not the only one
  console.log(queryStringObj);
  console.log(JSON.parse(queryStr));

  // 2) Pagination
  const page = req.query.page * 1 || 1; // * 1 => to convert it to number
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // build query
  const mongooseQuery = Product.find(JSON.parse(queryStr)) // => find return query and await => execute query  // but we should build the query first and then execite it
    .skip(skip) // so we can implement any method then execute query
    .limit(limit);
  // console.log('mongooseQuery', mongooseQuery);
  // execute query
  const products = await mongooseQuery;
  console.log('products', products);
  res.status(200).json({ results: products.length, page, data: products });
});
//****** Get Products End********/

//****** Get Spicified Product Start*******/
// @ Route Get /api/v1/Products/:id
// @ Access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    // res.status(404).json({ msg: "cat'n find this product of id : ", id });
    return next(new ApiError(`cat'n find this product of id : ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
//****** Get Spicified Product End*******/

//******* Create Product start*********/
// @ Route Post /api/v1/Products
// @ Access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  console.log(product);
  res.status(201).json({ data: product });
});
//******* Create Product End*********/

//******* Update Product Start*******/
// @ Route Put /api/v1/Products/:id
// @ Access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`cat'n find this product of id : ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
//******* Update Product End*******/

//******* Delete Product Start*******/
// @ Route post /api/v1/Product/:id
// @ Access Private
exports.deleletedProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  console.log('product', product);
  if (!product) {
    return next(new ApiError(`cat'n find this product of id : ${id}`, 404));
  }
  res.status(204).send();
});
//******* Delete product End*******/
