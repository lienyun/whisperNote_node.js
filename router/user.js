const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

// 註冊
router.post('/signup', userHandler.postSignup)
// 登入
router.post('/login', userHandler.postLogin)
// 登出
router.post('/', userHandler.postLogout)


module.exports = router

