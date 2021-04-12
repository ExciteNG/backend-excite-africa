const router = require('express').Router();
const affiliateController = require('../../Control/affiliate/affiliate_controllers');
const db = require("../../Database/models/index");
// const authJwt = require("../../Database/config/jwt");
const Affiliate = db.affiliate;
//middlewares
const {authJwt,verifyAffiliate} = require('../../Middleware/index');
const upload = require("../../Middleware/multer");

router.get('/signup', affiliateController.signup_get)
router.post('/signup', upload.single("image"), verifyAffiliate, affiliateController.signup_post)
router.get('/login', affiliateController.login_get)
router.post('/login', affiliateController.login_post)
// router.get('/user/:id',affiliateController.profile)
router.get('/profile/:refcode', async (req,res) => {
    try {
      const afUser = await Affiliate.findOne({
        where:{
          refcode:req.params.refcode
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
  })

module.exports = router