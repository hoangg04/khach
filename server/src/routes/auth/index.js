'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../middlewares/checkAuth.middleware')
const AuthController = require('../../controllers/auth.controller')
const validateFactory = require('../../middlewares/validation.middleware')
const { registerSchema, loginSchema } = require('../../validations/auth.validation')
const router = express.Router()


router.post('/register', validateFactory(registerSchema), asyncHandler(AuthController.register));
router.post('/login', validateFactory(loginSchema), asyncHandler(AuthController.login));
router.post('/renew', asyncHandler(AuthController.renew));
router.use(authentication)
router.post('/logout', asyncHandler(AuthController.logout));

module.exports = router;