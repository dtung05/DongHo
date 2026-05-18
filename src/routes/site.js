const express = require("express");
const router = express.Router();

const SiteController = require("../app/controllers/SiteController");

router.get('/lien-he.html', SiteController.lienHe);
router.get('/sale.html', SiteController.sale);
router.get('/tra-cuu', SiteController.traCuu);
router.get('/trang-chu', SiteController.home);
router.get('/', SiteController.home);
module.exports = router;