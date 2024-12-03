'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication, checkRole } = require('../../middlewares/checkAuth.middleware')
const ProductController = require('../../controllers/product.controller')
const validateFactory = require('../../middlewares/validation.middleware')
const { createProductSchema, updateProductSchema } = require('../../validations/product.validation')
const { ENUM_ROLE } = require('../../constant')
const router = express.Router()


router.get("/", asyncHandler(ProductController.getAllProducts))
router.get("/:product_id", asyncHandler(ProductController.getProductById))
router.use(authentication)
router.post("/", checkRole([ENUM_ROLE.ADMIN]), validateFactory(createProductSchema), asyncHandler(ProductController.createProduct))
router.put("/:product_id", checkRole([ENUM_ROLE.ADMIN]), validateFactory(updateProductSchema), asyncHandler(ProductController.updateProduct))
router.delete("/:product_id", checkRole([ENUM_ROLE.ADMIN]), asyncHandler(ProductController.deleteProduct))


module.exports = router;