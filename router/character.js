const express = require('express')

const router = express.Router()

const characterHandler = require('../router_handler/character')

router.get('/character', characterHandler.getCharacter)

router.post('/addCharacter', characterHandler.addCharacter)

router.get('/editCharacter', characterHandler.editCharacter)

router.get('/deleteCharacter', characterHandler.deleteCharacter)


module.exports = router

