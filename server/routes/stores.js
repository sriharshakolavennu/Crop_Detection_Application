const express = require('express')
const router = express.Router()

const stores = [
  {id:1,name:'Agri Store A',distance:'2.1 km',products:5,phone:'+91123456'},
  {id:2,name:'Farm Supplies B',distance:'4.6 km',products:12,phone:'+91123457'}
]

router.get('/', (req,res)=>{
  res.json({ok:true, stores})
})

module.exports = router
