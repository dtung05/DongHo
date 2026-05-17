const express = require("express");
const router = express.Router();
const middleware = require("../middleware/Middleware");
const CartController = require("../app/controllers/CartController");

router.post("/store.html",middleware.auth,CartController.store);
router.get("/index",middleware.auth,CartController.index );
router.post("/delete/:id", middleware.auth, CartController.delete);
module.exports = router;