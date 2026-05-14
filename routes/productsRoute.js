const express = require('express');

const router = express.Router();

//******** Import Start *********//

//******* Services Start ********/
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleletedProduct,
} = require('../services/productService');
//******* Services End ********/

//*******validation middelware start*****//
const {
  getProductValidator,
  createProductsValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');
//*******validation middelware End*****//

//******** Import End  *********//

router.route('/').get(getProducts).post(createProductsValidator, createProduct);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleletedProduct);

module.exports = router;
