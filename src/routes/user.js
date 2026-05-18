const express = require("express");
const router = express.Router();
const middleware= require("../middleware/Middleware");
const upload= require("../middleware/upload");
const UserController = require("../app/controllers/UserController");

router.post('/set-profile',upload.single('avatar'), UserController.setProfile);
router.get('/profile',middleware.auth, UserController.profile);
router.post('/authLogin', UserController.authLogin);
router.post('/dangKy', UserController.dangKy);
router.get('/logOut', UserController.logOut);

module.exports = router;