const express = require('express')
const GetCountriesListController = require('../controllers/getCountriesListController')
const ValidateController = require('../controllers/validateController')
const router = express.Router()

router.get('/getCountriesList', GetCountriesListController.index)
router.get('/', (req, res) => res.send('listeining'))
router.post('/validateUserData', ValidateController.index)

module.exports = router
