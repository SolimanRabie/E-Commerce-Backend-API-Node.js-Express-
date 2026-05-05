const express = require("express");
const router = express.Router();

//******** Import start *********/
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleletedCategory,
} = require("../services/categoryService");
//******** Import End *********/
//********* Routes start***********//
//**Get Categories start***/
router.route("/").get(getCategories).post(createCategory);
//**Get Categories End***/

//**Get Category Start***/
router.route("/:id").get(getCategory);
//**Get Category End***/

//**Update Category Start***/
router.route("/:id").get(updateCategory).put(updateCategory);
//**Update Category End***/

//**Delete Category Start***/
router.route("/:id").get(deleletedCategory).delete(deleletedCategory);
//**Delete Category End***/
//********* Routes end***********//

module.exports = router;
