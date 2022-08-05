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

//取得登入者資料
router.get('/getUser', userHandler.getUser)




module.exports = router

