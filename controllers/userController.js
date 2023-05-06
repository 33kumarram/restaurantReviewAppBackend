const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Users = require('../models/userModel')
const generateToken = require('../config/generateToken')

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please Fill all the fields')
  }

  const userExists = await Users.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error('Email already registered')
  }

  try {
    const newUser = await Users.create({
      name: name,
      email: email,
      password: password
    })

    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      name: name,
      token: generateToken(newUser.id)
    })
  } catch (err) {
    res.status(400)
    throw new Error('Error occurred while creating user')
  }
})

const logIn = asyncHandler(async function (req, res) {
  const { email, password } = req.body
  
  const user = await Users.findOne({ email })
  if(!user){
    res.status(400)
    throw new Error('User not registered')
  }

  // verify password using compare password function defined in the user model
  if (await user.comparePassword(password)) {
    res.status(201).json({
      id:user._id,
      email:user.email,
      name:user.name,
      token:generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Incorrect email or password')
  }
  
})

module.exports = {
  signUp,
  logIn
}