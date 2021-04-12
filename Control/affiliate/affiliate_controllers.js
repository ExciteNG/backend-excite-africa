//import models
const jwt = require('jsonwebtoken');
const db = require("../../Database/models/index");
const authJwt = require("../../Database/config/jwt");
const upload = require("../../Middleware/multer");
const Affiliate = db.affiliate;
const Role = db.role;
var bcrypt = require("bcryptjs");
const awsS3=require('aws-sdk');
const fs = require('fs');

let possibleComboCode = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const generateRefCode = () =>{
    let  genCode = [];

    for (let i = 0; i<6; i++){
        genCode.push(possibleComboCode[Math.floor(possibleComboCode.length*Math.random())])
    }
    return genCode.join('')
}
module.exports.signup_post = async (req, res) => {

    try {
        //save  affilate user to database
        if(req.body.password===req.body.password2){
          const affReg =  await Affiliate.create({
            full_name:req.body.full_name,
            refcode:generateRefCode(),
            username: req.body.username,
            email: req.body.email,
            phone_no:req.body.phone_no,
            address:req.body.address,
            state_of_origin:req.body.state_of_origin,
            lga:req.body.lga,
            means_of_id:req.body.means_of_id,
            passport:req.body.passport,
            password: bcrypt.hashSync(req.body.password, 10)
          })
          // if (affReg) {
          //   res.status(200).json({ newUser: newUser, msg: "Account created successfully" });
          // } else {
          //   res.status(400).json({ msg: "Username or Email already Exist" });
          // }        
        } else {
          res.status(400).json({ msg: "Password mismatch" });
        }
        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
};

module.exports.login_post = async (req, res) => {

    try {
        //check if user is already registered
        const affiliateUser =  await Affiliate.findOne({
            where: {
              username: req.body.username
            }
          })

          if (!affiliateUser) {
            return res.status(404).send({ message: "User Not found." });
          }

          //verify password credentials
          let passwordIsValid = await bcrypt.compareSync(
            req.body.password,
            affiliateUser.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          //create token

          var token = jwt.sign({ id: affiliateUser.id }, authJwt.secret, {
            expiresIn: 86400 // 24 hours
          });

         return res.status(200).send({
            id: affiliateUser.id,
            username: affiliateUser.username,
            email: affiliateUser.email,
            refcode:affiliateUser.refcode,
            accessToken: token
          });
    } catch (err) {
        res.status(500).send({error:err.message});
    }

module.exports.logout_get = (req,res) => {
  try {
    res.status(200).send({
      accessToken:null
    })

    res.redirect('/');
    
  } catch (err) {
    
  }

}

module.exports.profile =  async (req,res) => {
  try {
    const afUser = await Affiliate.findOne({
      where:{
        id:req.params.id
      }

    })
    if (!afUser){
       res.status(404).send({message:"User not found"})
    } else {
       res.status(200).send({User:afUser})
    }
  } catch (err) {
     res.status(500).send({error:err.message})
  }
}
    
//   Affiliate.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(affiliateUser => {
//       if (!affiliateUser) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }

//       var token = jwt.sign({ id: affiliateUser.id }, authJwt.secret, {
//         expiresIn: 86400 // 24 hours
//       });

//       var authorities = [];
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
};


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, 'Ewavesecret', {
        expiresIn:maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');

}

module.exports.login_get = (req, res) => {
    res.render('login');
    
}
