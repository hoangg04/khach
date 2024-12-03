'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/asyncHandler')
const UserController = require('../../controllers/user.controller')
const { authentication, checkRole } = require('../../middlewares/checkAuth.middleware')
const { ENUM_ROLE } = require('../../constant')
const validateFactory = require('../../middlewares/validation.middleware')

const router = express.Router()

router.use(authentication)
router.get("/me", asyncHandler(UserController.me));

module.exports = router;
