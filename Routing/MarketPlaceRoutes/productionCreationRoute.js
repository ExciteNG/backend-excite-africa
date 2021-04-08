const express = require("express");
const verify = require("../_jwtSign");

const router = express.Router();
const { ProductItem } = require("../../Database/models");

const {AWSFileUpload} = require('./_helper')

// Controls
const {CreateElectronics ,createFashionItem ,createHomeApplicanceItem , createVehicleItem ,createPhonesAndTableItem
} = require('../../Control/User/Marketplace/CreateProduct');
const { json } = require("body-parser");

router.post('/create-electronics/',verify, async(req,res)=>{
    const userID = req.userID.id;

    const {Category ,SubCategory, Address, LocalGovermentArea ,Description ,Price ,
            Brand ,Condition  ,State} = req.body
    const requestContent  =  req.body
    const {Image1 ,Image2} = req.files

    console.log(req.files)


    // console.log(req.body)
    const processMarketPlaceItem = await CreateElectronics(userID,data = requestContent , ImageFile = Image1)
    // const processMarketPlaceItem = true
    if (processMarketPlaceItem === false){
        return res.status(400).send(json.STRINGIFY({
            Message: 'Error Uploading Item',
          }))
    }

    return res.status(200).json({
        Message: 'Upload Successful',
      });
})


router.post('/create-fashion/',verify, async(req,res)=>{
        const userID = req.userID.id;
    
        const requestContent  =  req.body
        const {Image1 ,Image2} = req.files
        console.log(req.files)
        const processMarketPlaceItem = await createFashionItem(userID,data = requestContent , ImageFile = Image1)
        // const processMarketPlaceItem = true
        if (processMarketPlaceItem === false){
              return  res.status(400).json({
                Message: 'Error Uploading Item',
              })
        }
    
        console.log('the data location',processMarketPlaceItem)
        
        return  res.status(200).json({
            Message: 'Upload Successful',
          });
    })
    
router.post('/create-home-appliance/',verify, async(req,res)=>{
        const userID = req.userID.id;
    
        const {Category ,SubCategory, Address, LocalGovermentArea ,Description ,Price ,
                Brand ,Condition  ,State} = req.body
        const requestContent  =  req.body
        const {Image1 ,Image2} = req.files
        // console.log(req.body)
        const processMarketPlaceItem = await createHomeApplicanceItem(userID,data = requestContent , ImageFile = Image1)
        // const processMarketPlaceItem = true
        if (processMarketPlaceItem === false){
                res.status(400).send(json.STRINGIFY({
                Message: 'Error Uploading Item',
              }))
        }
    
        res.status(200).json({
            Message: 'Upload Successful',
          });
    })
    
router.post('/create-phones/',verify, async(req,res)=>{
        const userID = req.userID.id;
    
        const {Category ,SubCategory, Address, LocalGovermentArea ,Description ,Price ,
                Brand ,Condition  ,State} = req.body
        const requestContent  =  req.body
        const {Image1 ,Image2} = req.files
        // console.log(req.body)
        const processMarketPlaceItem = await createPhonesAndTableItem(userID,data = requestContent , ImageFile = Image1)
        // const processMarketPlaceItem = true
        if (processMarketPlaceItem === false){
                res.status(400).send(json.STRINGIFY({
                Message: 'Error Uploading Item',
              }))
        }
    
        res.status(200).json({
            Message: 'Upload Successful',
          });
    })

router.post('/create-vehicle/',verify, async(req,res)=>{
        const userID = req.userID.id;
    
        const {Category ,SubCategory, Address, LocalGovermentArea ,Description ,Price ,
                Brand ,Condition  ,State} = req.body
        const requestContent  =  req.body
        const {Image1 ,Image2} = req.files
        // console.log(req.body)
        const processMarketPlaceItem = await createVehicleItem(userID,data = requestContent , ImageFile = Image1)
        // const processMarketPlaceItem = true
        if (processMarketPlaceItem === false){
                res.status(400).send(json.STRINGIFY({
                Message: 'Error Uploading Item',
              }))
        }
    
        res.status(200).json({
            Message: 'Upload Successful',
          });
    })
    
    

module.exports = router