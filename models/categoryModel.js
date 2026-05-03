const mongoose = require("mongoose");
const { Schema } = mongoose;

//(1) create schema ******** schema start*******//
const categorySchema = new Schema({
  name: String,
});
//******** schema end*******//

//(2) create model ********* model start ******//
const categoryModel = mongoose.model("category", categorySchema);
// *********** model end *********//

module.exports = categoryModel;
