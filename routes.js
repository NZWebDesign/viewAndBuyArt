const express = require('express')
const fs = require('fs')
const router = express.Router()
const thingImported = require('./functions')
 
 //This is rendering buyArtPage.hbs
 router.get('/buyArtPage', (req,res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) return res.status(500)
      const parsedData = JSON.parse(data)
     // console.log(parsedData)
  res.render('buyArtPage' , parsedData)
})
})

//This is rendering uploadMoreArtPage.hbs
router.get('/uploadArt', (req,res) => {
  res.render('uploadMoreArtPage')
})

router.post('/uploadMoreArtPage', (req, res) => {
 // read the current data
fs.readFile('./data.json', 'utf-8', (err, existingData) => {
      if (err) return res.status(500)
      const parsedData = JSON.parse(existingData)

      //new data coming in
      const newData = req.body

      // write the new data (req.body)
      let newArtObj =  {
        id: parsedData.artwork.length+1,
        name: newData.name,
        artist: newData.artist,
        image: "/images/fantail1.jpg",
        price: newData.price
      }

      parsedData.artwork.push(newArtObj)

      // write file with the new data
      fs.writeFile('./data.json', JSON.stringify(parsedData, null, 2), (err) => {
        if (err) return res.status(500)
        else res.redirect('/buyArtPage')
      })
    })
})


router.post('/buyArtPage', (req, res) => {
//read the database to get artwork price
  fs.readFile('./data.json', 'utf-8', (err, existingData) => {
    if (err) return res.status(500)
    const parsedData = JSON.parse(existingData)
 
  //get the data from the form and store it in a variable
 const newData = req.body
 //console.log(newData.coolPerson)

 //separate each piec of data into it's own variable
let studentDiscount = newData.studentDiscount
let staffDiscount = newData.staffDiscount
let coolPerson = newData.coolPerson
//console.log("Student Discount: ", studentDiscount, "Staff Discount: ", staffDiscount, "Cool Person: ", coolPerson)

//Get the first letter in the string and make it uppercase
studentDiscount = studentDiscount.charAt(0).toUpperCase();
staffDiscount = staffDiscount.charAt(0).toUpperCase();
coolPerson = coolPerson.charAt(0).toUpperCase();
//console.log("FIRST CHAR: ","Student Discount: ", studentDiscount, "Staff Discount: ", staffDiscount, "Cool Person: ", coolPerson)

console.log("TEST_____", parsedData.artwork[0].price)
let artPrice = parsedData.artwork[0].price
console.log("art price: ", artPrice)

  if (studentDiscount == "N"){
    console.log("STudent Discount is N")
    artPrice = artPrice
  }else if (studentDiscount == "Y"){
    console.log("STudent Discount is Y")
//TODO+++++++++++++++++++++ WHY IS artPrice NAN? +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
    artPrice = thingImported.discountedPrice(artPrice, 10)
    console.log("DID IT GET HERE____", artPrice)
  }else{
    studentDiscount = "N"
    console.log("STudent Discount is: ", studentDiscount)
  }
    

  if (staffDiscount == "N"){
    console.log("STaff Discount is N")
  }else if (staffDiscount == "Y"){
    console.log("STaff Discount is Y")
  }else{
    staffDiscount = "N"
  }

  if (coolPerson == "N"){
    console.log("Cool Person Discount is N")
  }else if (coolPerson == "Y"){
    console.log("Cool Person Discount is Y")
  }else{
    coolPerson = "N"
  }
  

})

 
 res.redirect('/yourPricePage')
 })



//This is rendering yourPricePage.hbs
router.get('/yourPricePage', (req,res) => {
  res.render('yourPricePage')
  })

 //This is rendering contactPage.hbs
router.get('/contact', (req,res) => {
res.render('contactPage')
})

module.exports = router
