//****** imports start********* */
const Brand = require('../models/brandModel');
const Factory = require('./handlerFactory');
//****** imports End********* */

//****** Get Brands start********/
// @ Route Get /api/v1/brands
// @ Access Public
exports.getBrands = Factory.getAll(Brand);
//****** Get brands End********/

//****** Get Spicified brand Start*******/
// @ Route Get /api/v1/brands/:id
// @ Access Public
exports.getBrand = Factory.getOne(Brand);
//****** Get Spicified brand End*******/

//******* Create Brand start*********/
// @ Route Post /api/v1/brands
// @ Access Private
exports.createBrand = Factory.createOne(Brand);
//******* Create Brand End*********/

//******* Update Brand Start*******/
// @ Route Put /api/v1/brands/:id
// @ Access Private
exports.updateBrand = Factory.updateOne(Brand);

//******* Update Brand End*******/

//******* Delete Brand Start*******/
// @ Route post /api/v1/brands/:id
// @ Access Private
exports.deletebrand = Factory.deleteOne(Brand);
//******* Delete Brand End*******/
