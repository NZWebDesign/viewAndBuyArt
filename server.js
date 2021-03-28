const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const bodyParser = require("body-parser");

const server = express()

// Middlewares
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars 
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


//This is rendering homePage.hbs
server.get('/', (req,res) => {
    res.render('homePage' /*, parsedData*/)
 })

 //This is rendering buyArtPage.hbs
server.get('/buyArtPage', (req,res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) return res.status(500)
        const parsedData = JSON.parse(data)
        console.log(parsedData)
    res.render('buyArtPage' , parsedData)
 })
})

  //This is rendering contactPage.hbs
  server.get('/uploadArt', (req,res) => {
    res.render('uploadMoreArtPage')
 })


  //This is rendering contactPage.hbs
server.get('/contact', (req,res) => {
    res.render('contactPage')
 })


  





module.exports = server