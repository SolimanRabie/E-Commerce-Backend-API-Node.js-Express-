const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: [true, 'product must be unique'],
      minlength: [20, 'too short product title'],
      maxlength: [100, 'too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'product description is requierd'],
      minlength: [20, 'too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'product price is required'],
      trim: true,
      max: [200000, 'too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, 'product image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      required: true,
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be less or equal 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Mongoose Query middelware
productSchema.pre(/^find/, function () {
  this.populate({
    path: 'category',
    select: 'name',
  });
});
///

const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};

// for findOne ,findAll and update
productSchema.post('init', (doc) => {
  setImageUrl(doc);
});

// for create
productSchema.post('save', (doc) => {
  setImageUrl(doc);
});

module.exports = mongoose.model('Product', productSchema);
