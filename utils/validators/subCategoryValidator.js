const { check } = require('express-validator');
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
    .withMessage('too long subCategory name'),
  check('category').notEmpty().isMongoId().withMessage(' Category ID requird'),
  validatorMiddelware,
];

exports.updatesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory Message'),
  validatorMiddelware,
];

exports.deletesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory Message'),
  validatorMiddelware,
];
