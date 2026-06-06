const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
  // Mock weather data — integrate with real API (OpenWeatherMap) later
  const sample = {temperature:30,humidity:72,rainChance:40,windSpeed:6,icon:'🌦'}
  res.json({ok:true, weather: sample})
})

module.exports = router
