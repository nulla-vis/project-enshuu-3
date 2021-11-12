const express = require('express')
const bodyParser = require("body-parser");
const cors=require("cors");


const app = express()


const PORT = 3000
const corsOptions ={
   origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


// import routes
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/order')

app.post("/test/new", (req, res) => {
    console.log(req.body)

    res.status(201).send({"message": 'ok'})
})


// endpoints
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)

app.listen(PORT, () => {
    console.log(`API Gateway has started on port ${PORT}`)
})