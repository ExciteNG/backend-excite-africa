const express = require("express");
const verify = require("../_jwtSign");

const router = express.Router();

const { MembershipPlan, UserMembership } = require("../../Database/models");
const subscriptionControl = require("../../Control/User/Profile/subscriptions");

router.get("/get-subscriptions", async (req, res) => {
  const getPlans = await subscriptionControl.getAllMembershipPlan();

  if (getPlans == null) {
    return res.status(404).json({
      PlatformPlans: getPlans,
    });
  }

  return res.status(200).json({
    PlatformPlans: getPlans,
  });
});

router.get("/user-subscription", verify, async (req, res) => {
  const userID = req.userID.id;

  // getThe User Subscripttion
  const myPlan = await subscriptionControl.UserCurrentSubscription(userID);
  if (myPlan === null) {
    // Assign a subscription plan

    return res.status(404).json({
      UserSubscription: myPlan,
    });
  }
  // console.table(myPlan);
  return res.status(200).json({
    UserSubscription: myPlan,
  });
});

router.get('/upgrade-user-subscription',verify , async(req,res)=>{
    const userID = req.userID.id;
    const {PlanName} = req.query
    console.log(req.query)
    const currentPlan = await subscriptionControl.changeSubcription(userID ,PlanName )
    if (currentPlan === false){
        return res.status(404).json({
            Plan: 'Subscription Plan does not exist',
          });
    }
    
    return res.status(200).json({
        UserSubscription: currentPlan,
      }); 

})

module.exports = router;
