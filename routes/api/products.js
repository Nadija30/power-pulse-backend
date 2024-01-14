const express = require("express");
const { getProductCategories, getProducts } = require("../../controllers/products");
const router = express.Router();

// не забути мідлвару аус!!!
const { authenticate } = require('../../middlewares');
// get product categories
router.get("/categories",authenticate, getProductCategories);

// get all products
router.get("/",authenticate, getProducts);

module.exports = router;