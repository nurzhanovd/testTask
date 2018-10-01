const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const {fname, email, login, password} = req.body
    const user = new User({
      fname,
      email,
      login,
      password: bcrypt.hashSync(password, 5)
    })

    const newUser = await user.save()
    const payload = {
      _id: newUser._id,
    }
    const token = jwt.sign(payload, 'secret', {
      expiresIn: '1d'
    })

    res.send(token)
  }catch(e){
    console.log(e);
    res.status(500).send(e)
  }
}

const login = async (req, res) => {
  try{
    const {login, password} = req.body
    const user = await User.findOne({
      login
    })
    if(user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({_id: user._id}, 'secret', {
        expiresIn: '1d'
      })

      return res.send(token)
    }else{
      return res.status(400).send('No such user')
    }
  }catch(e){
    console.log(e);
    return res.status(500).send(e)
  }
}

module.exports = {
  register,
  login
}