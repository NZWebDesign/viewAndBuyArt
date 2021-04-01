function discountedPrice(artPrice, percentage){
  console.log("Yay____")
  let percentageNumber = (artPrice / 100) * percentage
  return artPrice-percentageNumber
  
}

module.exports ={
  discountedPrice
}