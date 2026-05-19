const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddelware = require('../../middelWares/validatorMiddelware');

exports.getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID'),
  validatorMiddelware,
];

exports.createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand name required')
    .isLength({ min: 3 })
    .withMessage('too short Brand name')
    .isLength({ max: 32 })
    .withMessage('too long Brand name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddelware,
];

exports.updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand Message'),
  body('name').custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddelware,
];

exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand Message'),
  validatorMiddelware,
];
