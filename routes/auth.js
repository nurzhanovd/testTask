const router =   require('express').Router()
const authCtrl = require('../controller/auth.controller')
const {registerValidator, loginValidator} = require('../middleware')

router.post('/register', registerValidator, authCtrl.register)
router.post('/login', loginValidator, authCtrl.login)


module.exports = router