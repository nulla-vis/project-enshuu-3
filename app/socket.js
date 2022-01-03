const axios = require('axios')
const { Socket } = require('socket.io')
const ORDER_API_URL = 'http://projectenshuuorder-env.eba-6vrtphy3.us-east-2.elasticbeanstalk.com/api/orders'
const MENU_LIST_API_URL = 'http://menu-env.eba-5hsjxsvv.us-west-2.elasticbeanstalk.com/api/menus/orderList/'

exports.initialize = function(server) {

    let io = require('socket.io')(server, {cors: {origin: "*"}})


    io.on('connection', function(socket){
        let order_data = []
        let order_id_array = []
        axios.get(`${ORDER_API_URL}/incoming/`).then((response) => {
            order_data.push(response.data)
            order_data[0].forEach(data => {
                data.menu_title = "pending..."
                data.menu_image = "pending..."
                order_id_array.push(data.menu_id)
            })
            axios.post(`${MENU_LIST_API_URL}`, {"id_list" : `"${order_id_array}"`},{
                headers: {'Content-Type': 'application/json'}
            })
            .then((response) => {
                order_data[0].forEach(data => {
                    response.data.menus.forEach(menu => {
                        if(data.menu_id === menu.id) {
                            data.menu_title = menu.title
                            data.menu_image = menu.menu_image
                        }
                    })
                })
                io.emit('getAllOrder', {order : order_data[0]})
            })
        })
        

        socket.on('newOrder', () => {
            let order_data = []
            let order_id_array = []
            axios.get(`${ORDER_API_URL}/incoming/`).then((response) => {
                order_data.push(response.data)
                order_data[0].forEach(data => {
                    data.menu_title = "pending..."
                    data.menu_image = "pending..."
                    order_id_array.push(data.menu_id)
                })
                axios.post(`${MENU_LIST_API_URL}`, {"id_list" : `"${order_id_array}"`},{
                    headers: {'Content-Type': 'application/json'}
                })
                .then((response) => {
                    order_data[0].forEach(data => {
                        response.data.menus.forEach(menu => {
                            if(data.menu_id === menu.id) {
                                data.menu_title = menu.title
                                data.menu_image = menu.menu_image
                            }
                        })
                    })
                    socket.broadcast.emit('incomingOrder',{order : order_data[0]})
                })
            })
            
        })

        // socket.on('disconnect', function(){
        //     userCount--
        //     io.emit('userCount', {userCount: userCount})
        //     console.log('disconnected...')
        // })
    })
}