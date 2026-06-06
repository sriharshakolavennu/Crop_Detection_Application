const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET = process.env.JWT_SECRET || 'cropcare_secret'

// In-memory user store (replace with DB)
const users = []
// In-memory OTP store: {mobile: {code, expiresAt}}
const otps = {}

router.post('/signup', async (req, res)=>{
  const {name,email,mobile,password} = req.body
  if(!email || !password) return res.status(400).json({error:'Missing fields'})
  const hashed = await bcrypt.hash(password,10)
  const user = {id: users.length+1, name, email, mobile, password: hashed}
  users.push(user)
  const token = jwt.sign({id:user.id,email:user.email}, SECRET, {expiresIn:'7d'})
  res.json({user:{id:user.id,name:user.name,email:user.email}, token})
})

router.post('/login', async (req,res)=>{
  const {email,password} = req.body
  // allow login with mobile or email
  const user = users.find(u=> u.email === email || u.mobile === email)
  if(!user) return res.status(401).json({error:'Invalid credentials'})
  const ok = await bcrypt.compare(password,user.password)
  if(!ok) return res.status(401).json({error:'Invalid credentials'})
  const token = jwt.sign({id:user.id,email:user.email}, SECRET, {expiresIn:'7d'})
  res.json({user:{id:user.id,name:user.name,email:user.email,mobile:user.mobile}, token})
})

// Send OTP to mobile (mock)
router.post('/otp/send', (req,res)=>{
  const {mobile} = req.body
  if(!mobile) return res.status(400).json({error:'Missing mobile'})
  const code = Math.floor(100000 + Math.random()*900000).toString()
  const expiresAt = Date.now() + 5*60*1000
  otps[mobile] = {code, expiresAt}
  // In production, integrate SMS gateway here. For now return code in response for testing.
  res.json({ok:true, mobile, otp: code})
})

router.post('/otp/verify', (req,res)=>{
  const {mobile, code} = req.body
  const entry = otps[mobile]
  if(!entry) return res.status(400).json({error:'No OTP requested'})
  if(Date.now() > entry.expiresAt) return res.status(400).json({error:'OTP expired'})
  if(entry.code !== code) return res.status(400).json({error:'Invalid OTP'})
  // create or find user by mobile
  let user = users.find(u=> u.mobile === mobile)
  if(!user){ user = {id: users.length+1, name:'Farmer', email:'', mobile}; users.push(user) }
  const token = jwt.sign({id:user.id,email:user.email}, SECRET, {expiresIn:'7d'})
  delete otps[mobile]
  res.json({ok:true, user:{id:user.id,name:user.name,mobile:user.mobile}, token})
})

module.exports = router
