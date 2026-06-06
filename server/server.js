const express = require('express')
const http = require('http')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')

const authRoutes = require('./routes/auth')
const detectRoutes = require('./routes/detect')
const productsRoutes = require('./routes/products')
const weatherRoutes = require('./routes/weather')
const storesRoutes = require('./routes/stores')
const chatRoutes = require('./routes/chat')
const expertsRoutes = require('./routes/experts')
const bookingsRoutes = require('./routes/bookings')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

app.use(cors())
app.use(express.json())

// Root Route
app.get('/', (req, res) => {
  res.send('CropCare API is running successfully')
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/detect', detectRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/stores', storesRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/experts', expertsRoutes)
app.use('/api/bookings', bookingsRoutes)

// Socket.IO
io.on('connection', (socket) => {
  console.log('socket connected', socket.id)

  socket.on('joinExpertRoom', (room) => {
    socket.join(room)
  })

  socket.on('expertMessage', (payload) => {
    io.to(payload.room).emit('expertMessage', payload)
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log('CropCare API running on', PORT)
})