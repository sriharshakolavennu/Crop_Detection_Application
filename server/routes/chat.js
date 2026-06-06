const express = require('express')
const router = express.Router()

// POST /api/chat - basic AI chatbot mock
router.post('/', (req,res)=>{
  const {message} = req.body
  // Very simple canned responses; replace with real AI integration
  let reply = 'Sorry, I could not understand.'
  if(message.toLowerCase().includes('disease')) reply = 'Which crop are you asking about?'
  if(message.toLowerCase().includes('tomato')) reply = 'Tomato leaf spots are often caused by fungi; recommend fungicide and cultural controls.'
  res.json({ok:true, reply})
})

module.exports = router
