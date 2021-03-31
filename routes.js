const express = require('express')
const fs = require('fs')
const router = express.Router()
 
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

 //This is rendering contactPage.hbs
router.get('/contact', (req,res) => {
res.render('contactPage')
})

module.exports = router
