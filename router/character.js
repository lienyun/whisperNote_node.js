const express = require('express')

const router = express.Router()

const characterHandler = require('../router_handler/character')

router.get('/character', characterHandler.getCharacter)

router.get('/addCharacter', characterHandler.addCharacter)

module.exports = router

