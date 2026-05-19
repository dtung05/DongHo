const express = require('express')
const router = express.Router();

const middleware = require("../middleware/Middleware");
const Comment = require("../app/controllers/CommentController");

router.post("/push", Comment.pushComment);

module.exports = router;