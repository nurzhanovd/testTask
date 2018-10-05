const router = require('express').Router()

router.use('/', require('./auth'))
router.use('/geodata', require('./geodata'))


module.exports = router