const express = require("express");
const verify = require("../../_jwtSign");

const router = express.Router();

const {  getAllPromotion ,getPromotionDetails,
    createPromotion ,getUsersDeals
}  = require('../../../Control/User/Marketplace/Promotions/PromotionActions')


router.get('/deals/get-all-deals',async(req,res)=>{
    const getItems = await getAllPromotion()
    if (getItems === false){
        return res.status(401).json({
            message: "Items  not found",
            data: [],
          });
    }

    return res.status(200).json({
        message: "Productsfound",
        data: getItems,
      });
})

router.get('/deals/get-user-deals',verify ,async(req,res)=>{
  const userID = req.userID.id;
  const getItems = await getUsersDeals(userID)
  if (getItems === false){
      return res.status(401).json({
          message: "Items  not found",
          data: [],
        });
  }

  return res.status(200).json({
      message: "Productsfound",
      data: getItems,
    });
})


router.post('/deals/create-deals/',verify,async(req,res)=>{
    const userID = req.userID.id;
    const requestContent  =  req.body
    const {Image1 ,Image2} = req.files
    console.log(req.files)
    const procesItem = await createPromotion(userID,data = requestContent , ImageFile = Image1)
    // const procesItem = true
    if (procesItem === false){
          return  res.status(400).json({
            Message: 'Error Uploading Item',
          })
    }

    console.log('the data location',procesItem)
    
    return  res.status(200).json({
        Message: 'Upload Successful',
      });
})


module.exports = router