const router =   require('express').Router()
const geoDataCtrl = require('../controller/geodata.controller')
const {auth} = require('../middleware')

router.get('/init', geoDataCtrl.initData)
router.get('/find', auth, geoDataCtrl.findData)


module.exports = router