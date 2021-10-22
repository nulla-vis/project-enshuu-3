// This is for handle routes of order service
const express = require('express')
const router = express.Router()
const axios = require('axios')
const MENU_API_URL = 'http://menu-env.eba-5hsjxsvv.us-west-2.elasticbeanstalk.com/api/menus'

// router.all('/:apiName/:path/', (req, res) => {
//     // console.log(req.params.apiName)
//     if(registry.services[req.params.apiName]) {
//         axios({
//             method: req.method,
//             url: registry.services[req.params.apiName].url + req.params.path,
//             headers: req.headers,
//             data: req.body
//         })
//         .then((response) => {
//             res.status(200).send(response.data)
//         })
//     } else {
//         res.send({message: "API name doesn't exist"})
//     }
// })

router.get('/all', (req, res) => {
    axios.get(MENU_API_URL).then((response) => {
        res.status(200).send(response.data)
    })
})

router.post('/detail/', (req, res) => {
    axios.post(`${MENU_API_URL}/detailMenu/`, 
    {
        menu_id: req.body.menu_id
    },{
        headers: {'Content-Type': 'application/json'}
    }).then((response) => {
        res.status(200).send(response.data)
    })
})

module.exports = router