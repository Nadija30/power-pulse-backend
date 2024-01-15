const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

/**
 * Schema for the Product model.
 */

const validDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const productDiarySchema = new Schema(
  {
    productId: {
      type: String,
      ref: "product",
      required: [true, 'ID is required'],
    },
    date: {
      type: String,
      match: [validDatePattern, "Date must be in 'yyyy-mm-dd' format"],
      required: [true, "Date is required"],
    },
    grams: {
      type: Number,
      default: null,
      required: [true, 'Amount is required'],
    },
    calories: {
      type: Number,
      default: null,
      required: [true, 'Calories is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productDiarySchema.post("save", handleMongooseError);

const ProductsDiary = model("productDiary", productDiarySchema);

module.exports = ProductsDiary;