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
  const { category, searchQuery, allowed } = req.query;
  const { blood } = req.user;
  // const blood = 2;

  const config = {};
  if (category) config.category = category;
  if (searchQuery) config.title = { $regex: searchQuery, $options: "i" };
  if (allowed === "yes") config[`groupBloodNotAllowed.${blood}`] = true;
  if (allowed === "no") config[`groupBloodNotAllowed.${blood}`] = false;

  const data = await Product.find(config);

  if (!data.length) {
    throw HttpError(404, "No products found");
  }

  res.json({
    result: data,
  });
};

module.exports = {
  getProductCategories: ctrlWrapper(getProductCategories),
  getProducts: ctrlWrapper(getProducts),
};
