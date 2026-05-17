// route/category.js

const express = require("express");
const router = express.Router();

const CategoryController = require("../app/controllers/CategoryController");

router.get("/:slug", CategoryController.detail);

module.exports = router;
