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
  uploadProductsImages,
  resizeProductImage,
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

router
  .route('/')
  .get(getProducts)
  .post(
    uploadProductsImages,
    resizeProductImage,
    createProductsValidator,
    createProduct,
  );

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    uploadProductsImages,
    resizeProductImage,
    updateProductValidator,
    updateProduct,
  )
  .delete(deleteProductValidator, deleletedProduct);

module.exports = router;
