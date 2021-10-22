// This is for handle routes of order service
const express = require('express')
const router = express.Router()
const axios = require('axios')
const ORDER_API_URL = 'http://127.0.0.1:8080/api/orders'
const MENU_API_URL = 'http://menu-env.eba-5hsjxsvv.us-west-2.elasticbeanstalk.com/api/menus'


// router.all('/order_api/', (req, res) => {
//     console.log('masuk api gateaway')
//     axios.get(`${ORDER_API_URL}`).then((response) => {
//         res.send(response.data)
//     })
// })
router.post('/create/', (req, res) => {
    axios.post(`${ORDER_API_URL}/create/`, req.body,{
        headers: {'Content-Type': 'application/json'}
    }).then((response) => {
        res.status(200).send({"message": "request masuk"})
    })
    // res.send({"message": req.body.lalala})
})

module.exports = router