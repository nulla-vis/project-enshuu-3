const express = require('express')
const bodyParser = require("body-parser");
const cors=require("cors");


const app = express()
let server = require('http').createServer(app)


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
const menuRoutes = require('./app/routes/menu')
const orderRoutes = require('./app/routes/order')

app.post("/test/new", (req, res) => {
    console.log(req.body)

    res.status(201).send({"message": 'ok'})
})


// endpoints
app.get("/", (req, res) => {
    res.send('hello world')
});
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)

// test socket.io
require('./app/socket.js').initialize(server);

server.listen(PORT, () => {
    console.log(`API Gateway has started on port ${PORT}`)
})