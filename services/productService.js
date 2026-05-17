//****** imports start********* */
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const { json } = require('express');
const ApiError = require('../utils/apiError');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
//****** imports End********* */

//****** Get Products start********/
// @ Route Get /api/v1/Products
// @ Access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Fileting
  // const queryStringObj = { ...req.query };
  // const execludesFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
  // execludesFields.forEach((field) => delete queryStringObj[field]);
  // // console.log(req.query);
  // let queryStr = JSON.stringify(queryStringObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // "\b  \b" -> to tell that i want the exacte value for gte|gt ... the same word
  // // g -> as if more than one value exist catch all of them not the only one
  // console.log(queryStringObj);
  // console.log(JSON.parse(queryStr));

  // 2) Pagination
  // const page = req.query.page * 1 || 1; // * 1 => to convert it to number
  // const limit = req.query.limit * 1 || 50;
  // const skip = (page - 1) * limit;

  // build query
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .pagination()
    .sort()
    .search();

  // execute query
  const products = await apiFeatures.mongooseQuery;
  console.log('products', products);
  res.status(200).json({ results: products.length, data: products });

  // .skip(skip) // so we can implement any method then execute query
  // .limit(limit);
  // // 3) Sorting
  // if (req.query.sort) {
  //   console.log(req.query.sort);
  //   // for sorting by more than one thing we must remove the ',' between them like => sort=price,-sold --> when i make mongooseQuery.sort(req.query.sort); ->> it sort by -> sort(price,-sold) but it must be like that -> sort(price -sold)
  //   // so we will split it in the ',' and join again with space
  //   // price,-sold =>[price , -sort] => price -sort
  //   const sortedBy = req.query.sort.split(',').join(' ');
  //   mongooseQuery = mongooseQuery.sort(sortedBy);
  // } else {
  //   mongooseQuery = mongooseQuery.sort('createdAt');
  // }
  // // 4) Fields Limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   mongooseQuery = mongooseQuery.select(fields);
  // } else {
  //   mongooseQuery = mongooseQuery.select('-__v');
  // }

  // 5) Searching
  // if (req.query.keyword) {
  //   console.log('req.query.keyword', req.query.keyword);
  //   const query = {};
  //   query.$or = [
  //     { title: { $regex: req.query.keyword, $options: 'i' } },
  //     { description: { $regex: req.query.keyword, $options: 'i' } },
  //   ];
  //   console.log('query', query);
  //   mongooseQuery = mongooseQuery.find(query);
  // }
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
