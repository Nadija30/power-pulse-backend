const express = require("express");
const { getProductCategories, getProducts } = require("../../controllers/products");
const router = express.Router();

const { authenticate } = require('../../middlewares');

// get product categories
router.get("/categories",authenticate, getProductCategories);

// get all products
router.get("/", authenticate, getProducts);

module.exports = router;