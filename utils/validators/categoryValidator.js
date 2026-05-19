const { check, body } = require('express-validator');
const slugify = require('slugify');

const validatorMiddelware = require('../../middelWares/validatorMiddelware');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category Message'),
  validatorMiddelware,
];

exports.createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category name required')
    .isLength({ min: 3 })
    .withMessage('too short Category name')
    .isLength({ max: 32 })
    .withMessage('too long Category name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddelware,
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category Message'),
  body('name').custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddelware,
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category Message'),
  validatorMiddelware,
];
