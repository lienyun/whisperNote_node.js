const express = require('express')

const router = express.Router()

const diaryHandler = require('../router_handler/diary')

router.post('/addDiary', diaryHandler.addPostDiary)

router.get('/getDiary', diaryHandler.getDiary)
router.get('/getMyDiary', diaryHandler.getMyDiary)

router.post('/editDiary', diaryHandler.editDiary)

router.post('/deleteDiary', diaryHandler.deleteDiary)

router.post('/addPer', diaryHandler.addPer)

router.get('/getPer', diaryHandler.getPer)

router.post('/deleteDiary', diaryHandler.deleteDiary)



module.exports = router

