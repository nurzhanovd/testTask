const User = require('../models/User')
const jwt  = require('jsonwebtoken')

const registerValidator = async (req, res, next) => {
  const {fname, password, email, login} = req.body
  if(!fname || !password || !email || !login){
    return res
      .status(400)
      .send('There is no required fields')
  }
  
  const user = await User.findOne({
    login,
    email
  })

  user ? res.status(400).send('Such user exist') : next()
}

const loginValidator = async (req, res, next) => {
  const {password, login} = req.body
  if(!password || !login){
    return res
      .status(400)
      .send('There is no required fields')
  }
  next()
}

const auth = async (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) res.status(400).send({data: null, err: 'There is no token provided'}).end()
  else {
    jwt.verify(token, 'secret', (err, result) => {
      if (err) res.status(400).send({data: null, err: err}).end()
      else if (result) {
        User.findOne({_id: result._id, email: result.email, role: result.role}, (err, user) => {
          if (err) res.status(400).send({data: null, err: err}).end()
          if (!user || !user._id) res.status(400).send({data: null, err: 'invalid token'}).end()
          else {
            const payload = {
              _id: user._id,
            }
            req.user = payload
            next()
          }
        })
        // res.status(200).send({data: result, err: null}).end()
      }
    })
  }
}

module.exports = {
  loginValidator,
  registerValidator
}