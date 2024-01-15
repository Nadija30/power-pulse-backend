const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

/**
 * Schema for the Product model.
 */
const productDiarySchema = new Schema(
  {
    product_ID: {
      type: String,
      ref: 'product',
      required: [true, 'ID is required'],
    },
    date: {
      type: String,
      default: '',
      required: true,
    },
    amount: {
      type: Number,
      default: null,
      required: true,
    },
    calories: {
      type: Number,
      default: '',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productDiarySchema.post('save', handleMongooseError);

const ProductsDiary = model('productDiary', productDiarySchema);

module.exports = ProductsDiary;