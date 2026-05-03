//****** imports start********* */
const categoryModel = require("../models/categoryModel");
//****** imports End********* */

exports.getCategories = (req, res) => {
  (req, res) => {
    const name = req.body.name;
    console.log("name : ", name);

    const newCategory = new categoryModel({ name: name });

    newCategory
      .save()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.json(err);
      });
  };
};
