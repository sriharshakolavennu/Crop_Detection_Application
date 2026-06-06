const express = require('express')
const router = express.Router()

const products = [
  {id:1,name:'Fungicide A',price:12.5,rating:4.5,image:'/images/p1.png',category:'Fungicide'},
  {id:2,name:'Fertilizer B',price:8.0,rating:4.0,image:'/images/p2.png',category:'Fertilizer'}
]

router.get('/', (req,res)=>{
  // support filters via query
  const {disease,category,priceMin,priceMax} = req.query
  let out = products
  if(category) out = out.filter(p=> p.category === category)
  res.json({ok:true, products: out})
})

module.exports = router
