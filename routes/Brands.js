const express = require("express");
const { fetchBrands, createBrand } = require("../controller/Brand");

const router = express.Router();

//products is already added
router.get("/", fetchBrands).post("/", createBrand);

exports.router = router;
