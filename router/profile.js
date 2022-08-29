const express = require('express')

const router = express.Router()

const profileHandler = require('../router_handler/profile')

// 取得profile
router.get('/profile', profileHandler.getProfile)

//更新profile
router.post('/profile', profileHandler.updateProfile)

// 向外共享路由对象
module.exports = router
