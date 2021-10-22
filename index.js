const express = require('express')
const app = express()
const PORT = 3000

// import routes
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/order')

// middleware
app.use(express.json())

// endpoints
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)

app.listen(PORT, () => {
    console.log(`API Gateway has started on port ${PORT}`)
})