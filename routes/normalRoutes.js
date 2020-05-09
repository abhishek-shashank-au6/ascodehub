const express = require('express')
const router = express.Router()
const {renderRegisterPage, renderLoginPage, renderDashboardPage, visitShortenedUrl} = require('../controllers/normalControllers')
const authenticate = require('../middlewares/authenticate')

router.get('/register', renderRegisterPage)

router.get('/login', renderLoginPage)

router.get('/dashboard', authenticate, renderDashboardPage)

router.get('/:shortUrl', authenticate, visitShortenedUrl)

module.exports = router
