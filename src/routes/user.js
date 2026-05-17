const express = require("express");
const router = express.Router();
const CartController = require("../app/controllers/CartController");

const UserController = require("../app/controllers/UserController");


// router.get('/tra-cuu', UserController.traCuu);
router.post('/authLogin', UserController.authLogin);
router.post('/dangKy', UserController.dangKy);
router.get('/logOut', UserController.logOut);

module.exports = router;