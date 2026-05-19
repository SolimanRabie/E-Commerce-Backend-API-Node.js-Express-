const { check, body } = require('express-validator');
const slugify = require('slugify');

const validatorMiddelware = require('../../middelWares/validatorMiddelware');

exports.getsubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory Message'),
  validatorMiddelware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('subCategory name required')
    .isLength({ min: 3 })
    .withMessage('too short subCategory name')
    .isLength({ max: 32 })
    .withMessage('too long subCategory name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check('category').notEmpty().isMongoId().withMessage(' Category ID requird'),
  validatorMiddelware,
];

exports.updatesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory Message'),
  body('name').custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddelware,
];

exports.deletesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory Message'),
  validatorMiddelware,
];
