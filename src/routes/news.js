
const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");


router.get("/ductung", (req,res)=>{
    res.send('đức  tùng');
})
router.get("/", newsController.index);
module.exports = router;