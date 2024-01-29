const express= require('express')
const {create, fetch, personInfo, update, deletePerson} = require('../controller/personController')
const route= express.Router()

route.post('/', create)
route.get('/', fetch)
route.get('/:workType', personInfo)
route.put('/:id', update)
route.delete('/:id', deletePerson)

module.exports= route