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
  const { page = 1, limit = 8, category, searchQuery, allowed } = req.query;
  const skip = (page - 1) * limit;
  // const { blood } = req.user;
  const blood = 2;

  const config = {};
  if (category) config.category = category;
  if (searchQuery) config.title = { $regex: searchQuery, $options: "i" };
  if (allowed === "yes") config[`groupBloodNotAllowed.${blood}`] = true;
  if (allowed === "no") config[`groupBloodNotAllowed.${blood}`] = false;

  const total = await Product.countDocuments({});
  const data = await Product.find(config, "", { skip, limit });

  if (!data.length) {
    throw HttpError(404, "No products found");
  }

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / data.length) + 1;
  const perPage = limit;
  // console.log(data.length, limit, totalPages, total);

  res.json({
    totalPages,
    currentPage,
    perPage,
    result: data,
  });
};

module.exports = {
  getProductCategories: ctrlWrapper(getProductCategories),
  getProducts: ctrlWrapper(getProducts),
};
