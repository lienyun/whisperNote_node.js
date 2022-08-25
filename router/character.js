const express = require('express')

const router = express.Router()

const characterHandler = require('../router_handler/character')

router.post('/addCharacter', characterHandler.addCharacter)

router.post('/editCharacter', characterHandler.editCharacter)

router.post('/deleteCharacter', characterHandler.deleteCharacter)

router.get('/getCharacter', characterHandler.getCharacter)



module.exports = router

