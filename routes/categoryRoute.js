const express = require("express");
const router = express.Router();

const { getCategories } = require("../services/categoryService");
//********* Routes start***********//
router.post("/", getCategories);
//********* Routes end***********//

module.exports = router;
