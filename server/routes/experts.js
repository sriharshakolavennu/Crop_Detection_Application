const express = require('express')
const router = express.Router()

// Sample in-memory experts
const experts = [
  {id:1,name:'Dr. Ramesh',speciality:'Crop Specialist',online:true,rating:4.8,avatar:'/images/expert1.jpg'},
  {id:2,name:'Ms. Kavya',speciality:'Disease Specialist',online:false,rating:4.6,avatar:'/images/expert2.jpg'},
  {id:3,name:'Mr. Suresh',speciality:'Soil Specialist',online:true,rating:4.7,avatar:'/images/expert3.jpg'},
  {id:4,name:'Dr. Anita',speciality:'Fertilizer Specialist',online:true,rating:4.5,avatar:'/images/expert4.jpg'},
  {id:5,name:'Mr. Rao',speciality:'Weather Specialist',online:false,rating:4.4,avatar:'/images/expert5.jpg'}
]

router.get('/', (req,res)=>{
  const {speciality} = req.query
  let out = experts
  if(speciality) out = out.filter(e=> e.speciality.toLowerCase().includes(speciality.toLowerCase()))
  res.json({ok:true, experts: out})
})

router.get('/:id', (req,res)=>{
  const id = Number(req.params.id)
  const ex = experts.find(e=> e.id === id)
  if(!ex) return res.status(404).json({error:'Expert not found'})
  res.json({ok:true, expert: ex})
})

module.exports = router
