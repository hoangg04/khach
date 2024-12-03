'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication, checkRole } = require('../../middlewares/checkAuth.middleware')
const CartController = require('../../controllers/cart.controller')
const { ENUM_ROLE } = require('../../constant')
const router = express.Router()


router.use(authentication)
router.post("/", checkRole([ENUM_ROLE.USER]), asyncHandler(CartController.addToCart))
router.get("/", checkRole([ENUM_ROLE.USER]), asyncHandler(CartController.getCart))
router.put("/", checkRole([ENUM_ROLE.USER]), asyncHandler(CartController.updateCart))
router.delete("/", checkRole([ENUM_ROLE.USER]), asyncHandler(CartController.deleteCart))



module.exports = router;