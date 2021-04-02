var express = require('express');
var multer = require('multer')
var upload = multer({ dest: './public/uploads/' })
var router = express.Router();
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');


router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/create", controller.create);

router.get("/:id", controller.viewUser);
router.post("/create",
    upload.single('avatar'),
    validate.postCreate,
    controller.doCreate);

module.exports = router;