const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

// 註冊
router.post('/signup', userHandler.postSignup)
// 登入
router.post('/login', userHandler.postLogin)
// 登出
router.post('/logout', userHandler.postLogout)
//登入狀態
router.get('/loginStatus', userHandler.loginStatus)



module.exports = router

