const { check } = require('express-validator');
const validatorMiddelware = require('../../middelWares/validatorMiddelware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');

exports.createProductsValidator = [
  check('title')
    .notEmpty()
    .withMessage('product title is required')
    .isLength({ min: 3 })
    .withMessage('too short title must be at least 3 char'),
  check('description')
    .notEmpty()
    .withMessage('product description is requierd')
    .isLength({ min: 20 })
    .withMessage('too short product description'),
  check('quantity')
    .isNumeric()
    .withMessage('product quantity must be a number')
    .notEmpty()
    .withMessage('product quantity is required'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('solded quantity must be a number'),
  check('price')
    .isNumeric()
    .withMessage('product price must be a number')
    .notEmpty()
    .withMessage('product price is required')
    .isLength({ max: 20 })
    .withMessage('too long product price'),
  check('priceAfterDiscount')
    .optional()
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          'priceAfterDiscount must be less or equal the product price',
        );
      }
      return true;
    }),
  check('colors').optional().isArray().withMessage('colors an array of string'),
  check('imageCover').notEmpty().withMessage('product image cover is required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('images should be an array of string '),
  check('category')
    .isMongoId()
    .withMessage('invalid id formate')
    .notEmpty()
    .withMessage('product must be belong to category')
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('can not find this category');
      }
    }),
  check('subCategories')
    .optional()
    .isArray()
    .withMessage('subCategories must be an array'),
  check('subCategories.*').isMongoId().withMessage('invalid id formate'),
  check('subCategories')
    .custom(async (subCategoryIds) => {
      const subCategory = await SubCategory.find({
        _id: { $exists: true, $in: subCategoryIds },
      });
      if (subCategory.length !== subCategoryIds.length) {
        throw new Error('can not find this Subcategory');
      }
    })
    .custom(async (valus, { req }) => {
      const subCategories = await SubCategory.find({
        category: req.body.category,
      });
      const subcategoriesIdInDb = [];
      subCategories.forEach((subCategory) => {
        subcategoriesIdInDb.push(subCategory._id.toString());
      });
      console.log(subcategoriesIdInDb);
      const checker = valus.every((val) => subcategoriesIdInDb.includes(val));
      if (!checker) {
        throw new Error('Subcategories do not belong to this category !!');
      }
    }),
  check('brand').optional().isMongoId().withMessage('invalid id formate'),
  check('ratingAverage')
    .optional()
    .isNumeric()
    .withMessage('avg rating must be number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be less or equal .0'),
  check('ratingQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingQuantity must be a number'),
  validatorMiddelware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('invalid ID formate'),
  validatorMiddelware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('invalid ID formate'),
  validatorMiddelware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('invalid ID formate'),
  validatorMiddelware,
];
