const express = require("express");
const { getProductCategories, getProducts } = require("../../controllers/products");
const router = express.Router();

// не забути мідлвару аус!!!

// get product categories
router.get("/categories", getProductCategories);

// get all products
router.get("/", getProducts);

module.exports = router;