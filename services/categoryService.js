//****** imports start********* */
const Category = require('../models/categoryModel');
const Factory = require('./handlerFactory');
//****** imports End********* */

//****** Get Categories start********/
// @ Route Get /api/v1/categories
// @ Access Public
exports.getCategories = Factory.getAll(Category);
//****** Get Categories End********/

//****** Get Spicified Category Start*******/
// @ Route Get /api/v1/Categories/:id
// @ Access Public
exports.getCategory = Factory.getOne(Category);
//****** Get Spicified Category End*******/

//******* Create Catrogry start*********/
// @ Route Post /api/v1/category
// @ Access Private
exports.createCategory = Factory.createOne(Category);
//******* Create Category End*********/

//******* Update Category Start*******/
// @ Route Put /api/v1/Categories/:id
// @ Access Private
exports.updateCategory = Factory.updateOne(Category);

//******* Update Category End*******/

//******* Delete Category Start*******/
// @ Route post /api/v1/Categories/:id
// @ Access Private
exports.deleletedCategory = Factory.deleteOne(Category);
//******* Delete Category End*******/
