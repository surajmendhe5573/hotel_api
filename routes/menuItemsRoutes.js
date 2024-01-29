const express= require('express')
const {create, fetch, menuInfo, update, deleteMenu} = require('../controller/menuItemsController')
const route1= express.Router()

route1.post('/', create)
route1.get('/', fetch)
route1.get('/:tasteType', menuInfo)
route1.put('/:id', update)
route1.delete('/:id', deleteMenu)

module.exports= route1