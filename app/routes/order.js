// This is for handle routes of order service
const express = require('express')
const router = express.Router()
const axios = require('axios')
const ORDER_API_URL = 'http://projectenshuuorder-env.eba-6vrtphy3.us-east-2.elasticbeanstalk.com/api/orders'


router.post('/create/', (req, res) => {
    axios.post(`${ORDER_API_URL}/create/`, req.body,{
    headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
       res.status(200).send(response.data)
    })

})

router.get('/allIncoming', (req, res) => {
  axios.get(`${ORDER_API_URL}/incoming/`).then((response) => {
      res.status(200).send(response.data)
  })
})

module.exports = router



 