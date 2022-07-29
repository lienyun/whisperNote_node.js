const express = require('express')

const router = express.Router()

const friendHandler = require('../router_handler/friend')

router.get('/getFriend', friendHandler.getFriend)

router.post('/addFriend', friendHandler.addFriend)


module.exports = router
