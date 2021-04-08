const express = require("express");
const verify = require("../_jwtSign");
const router = express.Router();

const {StoreUserSocailInformation} = require('../../Control/User/Marketplace/SocialMediaIntergration')

router.post('/store-social-info',verify,async(req,res)=>{
    // const {load} = req.body
    const userID = req.userID.id;

    const createUserSocials =  await StoreUserSocailInformation(userID)
    console.log(createUserSocials)
    if (createUserSocials === false){
        return res.status(400).json({
            Message: 'Creating Social Account failed',
          }); 
    }

    if (createUserSocials === null){
        return res.status(400).json({
            Message: 'Creating Social Account failed',
          }); 
    }

    return res.status(200).json({
        Message: 'Creating Social Account Successful',
        data : createUserSocials['JWTtoken']
      }); 
})

module.exports = router