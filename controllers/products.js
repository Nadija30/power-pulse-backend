const fs = require("fs/promises");
const path = require("path");
const categoriesPath = path.join(__dirname, "../productsCategories.json");

const { HttpError, ctrlWrapper } = require("../helpers");

// GET CATEGORIES
const getProductCategories = async (req, res) => {
  const data = await fs.readFile(categoriesPath);
    // console.log(JSON.parse(data));
    
  if (!data) {
    throw HttpError(404, "No categories found");
    }
    
  res.json(JSON.parse(data));
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {

}

module.exports = {
    getProductCategories: ctrlWrapper(getProductCategories),
    getProducts: ctrlWrapper(getProducts),
};
