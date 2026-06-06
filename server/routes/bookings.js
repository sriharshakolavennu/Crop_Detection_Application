const express = require('express')
const router = express.Router()

// In-memory bookings
const bookings = []

router.post('/', (req,res)=>{
  const {userId, expertId, datetime, notes} = req.body
  if(!userId || !expertId || !datetime) return res.status(400).json({error:'Missing fields'})
  const booking = {id: bookings.length+1, userId, expertId, datetime, notes, status:'scheduled'}
  bookings.push(booking)
  res.json({ok:true, booking})
})

router.get('/', (req,res)=>{
  const {userId} = req.query
  if(userId) return res.json({ok:true, bookings: bookings.filter(b=> b.userId == userId)})
  res.json({ok:true, bookings})
})

module.exports = router
