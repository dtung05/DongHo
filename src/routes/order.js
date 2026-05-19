const express = require("express");
const router = express.Router();
const middleware = require("../middleware/Middleware");
const OrderController = require("../app/controllers/OrderController");

//staff



// client
router.get('/index/:status',middleware.auth,OrderController.index );
router.get('/index',middleware.auth,OrderController.index );
router.post("/create", middleware.auth, OrderController.create);
router.post("/store", middleware.auth, OrderController.store);
router.post("/cancel", middleware.auth, OrderController.cancel);


module.exports = router;