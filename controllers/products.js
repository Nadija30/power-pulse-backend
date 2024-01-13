const fs = require("fs/promises");
const path = require("path");
const categoriesPath = path.join(__dirname, "../productsCategories.json");

const { HttpError, ctrlWrapper } = require("../helpers");
const Product = require("../models/product");

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
// дані про групу крові витягнути з юзера
// фільтри з параметрів запиту
const getProducts = async (req, res) => {
  const { page = 1, limit = 8, category, searchQuery } = req.query;
  const skip = (page - 1) * limit;

  // const { blood } = req.user;
  // console.log(blood)
  // const allowed = true;
  const blood = 2;

  const config = {
    category,
    groupBloodNotAllowed: { "1": false,
    "2": true,
    "3": false,
    "4": true },
    title: { $regex: searchQuery, $options: "i" },
    
    }

  const data = await Product.find(config, "", { skip, limit });

  console.log(data[1].groupBloodNotAllowed[blood])

  if (!data.length) {
    throw HttpError(404, "No products found")
  }

  console.log(data[1].groupBloodNotAllowed[blood])
  res.json(data);
};

module.exports = {
  getProductCategories: ctrlWrapper(getProductCategories),
  getProducts: ctrlWrapper(getProducts),
};
