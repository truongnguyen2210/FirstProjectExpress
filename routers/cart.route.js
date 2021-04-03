var express = require('express');
var router = express.Router();
var controller = require("../controller/cart.controller");

router.get("/add/:productId", controller.addToCart);

module.exports = router;