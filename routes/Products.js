const express = require("express");
const { createProduct } = require("../controller/Product");

const router = express.Router();

//products is already added
router.post("/", createProduct);

exports.router = router;
