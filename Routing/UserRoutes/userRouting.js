const express = require("express");
const verify = require("../_jwtSign");

const router = express.Router();

const {
  MembershipPlan,
  UserMembership,
  Profile,
} = require("../../Database/models");
const { createProfile , editProfile ,getUserProfilebyUserID } = require("../../Control/User/Profile/userActions");
const subscriptionControl = require("../../Control/User/Profile/subscriptions");

router.post("/create-profile", verify, async (req, res) => {
  const userID = req.userID.id;

  const { Address, PhoneNumber, Bio } = req.body;
  const data = req.body;

  const newProfile = await createProfile(userID, data);
  if (newProfile === false) {
    return res.status(404).json({
      Message: "Profile Creation Failed",
    });
  }

  if (newProfile === null) {
    return res.status(404).json({
      Message: "Profile Already Exist",
    });
  }

  return res.status(200).json({
    Message: "Profile Created Successfully",
  });
});

router.get('/get-user-profile',verify,async(req,res)=>{
  const userID = req.userID.id;
  const userProfile = await getUserProfilebyUserID(userID)
  if (userProfile === null) {
    return res.status(404).json({
      Message: "Profile not found",
    });
  }

  return res.status(200).json({
    Message: "Profile  found",
    data : userProfile
  });

})

module.exports = router;
