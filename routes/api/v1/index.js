var express = require('express');

const categoryController = require("../../../src/controllers/categorycontroller");
const productController  = require("../../../src/controllers/productcontroller");
const userController = require("../../../src/controllers/usercontroller");
var router = express.Router();

router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProduct);
router.post("/product/add", productController.addProduct);
router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
module.exports = router;
