//****** imports start********* */
const Product = require('../models/productModel');
const Factory = require('./handlerFactory');
//****** imports End********* */

//****** Get Products start********/
// @ Route Get /api/v1/Products
// @ Access Public
exports.getProducts = Factory.getAll(Product, 'products');
//****** Get Products End********/

//****** Get Spicified Product Start*******/
// @ Route Get /api/v1/Products/:id
// @ Access Public
exports.getProduct = Factory.getOne(Product);
//****** Get Spicified Product End*******/

//******* Create Product start*********/
// @ Route Post /api/v1/Products
// @ Access Private
exports.createProduct = Factory.createOne(Product);
//******* Create Product End*********/

//******* Update Product Start*******/
// @ Route Put /api/v1/Products/:id
// @ Access Private
exports.updateProduct = Factory.updateOne(Product);

//******* Update Product End*******/

//******* Delete Product Start*******/
// @ Route post /api/v1/Product/:id
// @ Access Private
exports.deleletedProduct = Factory.deleteOne(Product);
//******* Delete product End*******/
