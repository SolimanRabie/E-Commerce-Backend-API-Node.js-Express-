const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'subcategory must be unique'],
      minlength: [2, 'too short subCategory name'],
      maxlength: [32, 'too long subCategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      required: [true, 'subCategory mudt be belong to parent Category'],
    },
  },

  { timestamps: true },
);
module.exports = mongoose.model('SubCategory', subCategorySchema);
