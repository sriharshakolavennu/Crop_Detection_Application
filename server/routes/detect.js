const express = require('express')
const router = express.Router()

// POST /api/detect - accept image or reference and return mock detection
router.post('/', (req,res)=>{
  // For now return sample detection result; integrate ML model here
  const sample = {
    crop:'Tomato',
    disease:'Leaf Spot',
    confidence:92,
    severity:'Moderate',
    symptoms:['Brown spots','Yellowing'],
    causes:['Fungal infection','Humidity'],
    treatment:'Apply recommended fungicide, remove affected leaves.'
  }
  res.json({ok:true, result: sample})
})

module.exports = router
