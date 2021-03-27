var express = require('express');
var router = express.Router();
var controller = require('../controller/auth.controller');
var validate = require('../validate/auth.validate')

router.get("/login", controller.login);
router.post("/postLogin", validate.postLogin, controller.postLogin);

module.exports = router;