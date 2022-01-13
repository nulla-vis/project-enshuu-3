// This is for handle routes of order service
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')
const res = require('express/lib/response')
const ORDER_API_URL = 'http://projectenshuuorder-env.eba-6vrtphy3.us-east-2.elasticbeanstalk.com/api/orders'
const MENU_LIST_API_URL = 'http://menu-env.eba-5hsjxsvv.us-west-2.elasticbeanstalk.com/api/menus/orderList/'


router.post('/create/', (req, res) => {
    axios.post(`${ORDER_API_URL}/create/`, req.body,{
    headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
       res.status(200).send(response.data)
    }).catch(function () {
      console.log("Promise Rejected");
 });

})

router.post('/update', (req,res) => {
  const id = req.body.id
  axios.put(`${ORDER_API_URL}/${id}`, {status: req.body.status}, {
    headers: {'Content-Type': 'application/json'}
  }).then((response) => {
    res.send(response.data)
  })
})

router.post('/delete', (req, res) => {
  const id = req.body.id
  axios.delete(`${ORDER_API_URL}/${id}`, {
    headers: {'Content-Type': 'application/json'}
  }).then((response) => {
    res.send(response.data)
  })
})
router.get('/allIncoming', (req, res) => {
  axios.get(`${ORDER_API_URL}/incoming/`).then((response) => {
    if(response.data.length == 0) {
      res.send({message: 'empty'})
    }else {
      cartDetail(res, response)
    }
  }).catch(function () {
    console.log("API-GET Promise Rejected");
  });
})

router.get('/allFinishedDetail', (req, res) => {
  axios.get(`${ORDER_API_URL}/all_finished/`).then((response) => {
    cartDetail(res, response)
  }).catch(function () {
    console.log("API-GET allFinishedDetail Promise Rejected");
  });
})

router.get('/allOrders', (req, res) => {
  axios.get(`${ORDER_API_URL}/allOrders`).then((response) => {
    res.status(200).send(response.data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Order details."
    })
  })
})

// helper funtion==========================================================================================
const  cartDetail = (res, response) => {
  let order_data = []
  let order_id_array = []
  if(response.data != null) {
    order_data.push(response.data)
    order_data[0].forEach(data => {
      order_id_array.push(data.menu_id)
    })
    if(order_id_array.length != 0 ) {
      axios.post(`${MENU_LIST_API_URL}`, {"id_list" : `"${order_id_array}"`},{
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
          order_data[0].forEach(data => {
            response.data.menus.forEach(menu => {
              if(data.menu_id === menu.id) {
                data.menu_title = menu.title
                data.menu_image = menu.menu_image
              }
            })
          })
          res.status(200).send(order_data[0])
      }).catch(function () {
        console.log("API-POST Promise Rejected");
      });
    }
  }
}
// =========================================================================================================


module.exports = router



 