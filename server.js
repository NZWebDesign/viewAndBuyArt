const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const bodyParser = require("body-parser");

const artRoutes = require('./routes')
const server = express()

// Middlewares
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

server.use('/', artRoutes)

// Handlebars 
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


//This is rendering homePage.hbs
server.get('/', (req,res) => {
    res.render('homePage' /*, parsedData*/)
 })

module.exports = server