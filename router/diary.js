const express = require('express')

const router = express.Router()

const diaryHandler = require('../router_handler/diary')

router.post('/addDiary', diaryHandler.addPostDiary)

router.get('/getDiary', diaryHandler.getDiary)

router.get('/editDiary', diaryHandler.editDiary)

router.get('/addPer', diaryHandler.addPer)


module.exports = router

