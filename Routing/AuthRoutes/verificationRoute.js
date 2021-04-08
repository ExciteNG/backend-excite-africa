const express = require("express");

const router = express.Router();

const verify = require("../_jwtSign");

// const {User} = require('../../Database/models')

router.get('/verify/01/:token',verify ,async(req,res)=>{
    const token = req.body.params
    console.log(token)


    return res.json({
        'code':200,
        token : token
    }).status(200)
})

router.get('/verify/02',verify ,async(req,res)=>{
    return res.json({
        'code':200
    }).status(200)
})

router.get('/verify/03',verify ,async(req,res)=>{
    return res.json({
        'code':200
    }).status(200)
})

module.exports = router;
