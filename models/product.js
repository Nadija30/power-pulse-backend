const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// схема
const productSchema = new Schema(
  {
    weight: {
      type: Number,
      min: 35,
      required: [true, "Set weight for product"],
    },
    calories: {
      type: Number,
      min: 1,
      required: [true, "Set calories for product"],
    },
    category: {
      type: String,
      required: [true, "Set category for product"],
    },
    title: {
      type: String,
      required: [true, "Set title for product"],
    },
    groupBloodNotAllowed: {
      type: Object,
      required: [true, "Set blood groups for product"],
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

// модель (клас, який буде працювати з колекцією product)
const Product = model("product", productSchema);

// імпортуємо в контролери
module.exports = Product;
