const mongoose = require('mongoose');

const { Schema } = mongoose;

//(1) create schema ******** schema start*******//
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name required'],
      unique: [true, 'Brand name must be unique'],
      minlength: [3, 'too short Brand name'],
      maxlength: [32, 'too long Brand name'],
    },
    //A and B => if it's a url i want to send it to the frontend i will use "slug"=>which makes the url => a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);
//******** schema end*******//

//(2) create model ********* model start ******//
const brandModel = mongoose.model('Brand', brandSchema);
// *********** model end *********//

module.exports = brandModel;
