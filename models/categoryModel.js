const mongoose = require('mongoose');

const { Schema } = mongoose;

//(1) create schema ******** schema start*******//
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name required'],
      unique: [true, 'Category name must be unique'],
      minlength: [3, 'too short Category name'],
      maxlength: [32, 'too long Category name'],
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

//*******SET image url start ********/

//*******SET image url End ********/
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// for findOne ,findAll and update
categorySchema.post('init', (doc) => {
  setImageUrl(doc);
});

// for create
categorySchema.post('save', (doc) => {
  setImageUrl(doc);
});

//(2) create model ********* model start ******//
const categoryModel = mongoose.model('category', categorySchema);
// *********** model end *********//

module.exports = categoryModel;
