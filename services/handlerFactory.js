const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
// eslint-disable-next-line no-unused-vars
const ApiFeatures = require('../utils/apiFeatures');

//******* Delete Handler Start*******/
// @ Route post /api/v1/model/:id
// @ Access Private
exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    console.log('document', document);
    if (!document) {
      return next(new ApiError(`cat'n find this document of id : ${id}`, 404));
    }
    res.status(204).send();
  });
//******* Delete Handler End*******/

//******* Update Handler Start*******/
// @ Route post /api/v1/model/:id
// @ Access Private
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`cat'n find this brand of id : ${req.params.id}`, 404),
      );
    }
    res.status(200).json({ data: document });
  });
//******* Update Handler End*******/

//******* Create Handler Start*******/
// @ Route post /api/v1/model/:id
// @ Access Private
exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });
//******* Create Handler End*******/

//******* GetOne Handler Start*******/
// @ Route post /api/v1/model/:id
// @ Access Private
exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      // res.status(404).json({ msg: "cat'n find this category of id : ", id });
      return next(
        new ApiError(`cat'n find this subcategory of id : ${id}`, 404),
      );
    }
    res.status(200).json({ data: document });
  });
//******* GetOne Handler End*******/

//******* GetAll Handler Start*******/
// @ Route post /api/v1/model/:id
// @ Access Private
exports.getAll = (model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // build query
    const documentsCount = await model.countDocuments();
    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .filter()
      .paginate(documentsCount)
      .sort()
      .search(modelName);

    const { mongooseQuery, paginationResult } = apiFeatures;
    // execute query
    const documentes = await mongooseQuery;
    res
      .status(200)
      .json({ results: documentes.length, paginationResult, data: documentes });
  });
//******* GetAll Handler End*******/
