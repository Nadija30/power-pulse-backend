const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// схема
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

// модель (клас, який буде працювати з колекцією product)
const Product = model("product", productSchema);

// імпортуємо в контролери 
module.exports = Product;
