'use strict'
const express = require('express')
const router = express.Router()


router.use("/user", require("./users"));
router.use("/auth", require("./auth"));
router.use("/products", require("./product"));
router.use("/cart", require("./cart"));

module.exports = router;