const express= require('express')
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
const bcrypt= require('bcrypt')
const route = require('./routes/personRoute')  // import the routes of person
const route1 = require('./routes/menuItemsRoutes') // import the routes menuItems 
const app= express()

app.use(bodyParser.json())  // middleware

const PORT= 5200
const URL= 'mongodb://localhost:27017/Hotel'

mongoose.connect(URL).then(()=>{
    console.log('Monnogdb is connected');
})
.catch((error)=>{
    console.log(error);
})

app.get('/', (req,res)=>{
    res.send('Welcome to our Restaurent')
})

app.listen(PORT, ()=>{
    console.log('Serve is running');
})


app.use('/person', route)  // use person route
app.use('/menu', route1)  // use menuItem route