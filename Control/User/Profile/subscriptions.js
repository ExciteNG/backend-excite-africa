const {
  User,
  Profile,
  MembershipPlan,
  UserMembership,
} = require("../../../Database/models");

const getUserbyID = async (obj) => {
  const theUser = User.findOne({
    where: {
      id: obj,
    },
    attributes: ["Username", "Email", "id"],
  });
  return theUser;
}; 

// Gets Memeberhsip plans
const getAllMembershipPlan = async () => {
  const plans = MembershipPlan.findAll();
  if (plans === null) {
    return null;
  }
  return plans;
};

// Gets Specific Plan by Name
const getMembershipPlanByName = async (planName) => {
  const thePlan = MembershipPlan.findOne({
    where: {
      PlanName: planName,
    },
    attributes: ["id", "PlanName", "PlanPrice"],
  });
  if (thePlan === null) {
    return null;
  }
  return thePlan;
};

// Gets Specific Plan by User
const UserCurrentSubscription = async (userID) => {
  const thePlan = await UserMembership.findOne({
    where: {
      UserAccountMembershipID: userID,
    }, 
    attributes: ["PlanID"],
    include: [
      {
        model: User,
        attributes: ["Username", "Email",],
      },
      { model: MembershipPlan, attributes: ["PlanName", "PlanPrice",'id'] },
    ],
  });
  if (thePlan === null) {

    // await UserMembership.create({
    //   UserAccountMembershipID : userID,
    //   PlanID : "74884nkjwhqauu",
    //   MembershipPlanID : 4 ,

    // })
    return null;

  }

  return thePlan;
};



const changeSubcription = async (userID, PlanName) => {
  const getUserCurrentPlan = await UserCurrentSubscription(userID);
  console.log('The Plan from paystack',PlanName)
  if (getUserCurrentPlan === null) {
    return false;
  }

  // console.log("Users Current Plan --", getUserCurrentPlan);
  // Get the MembershipPlan
  const membershipPlan = await getMembershipPlanByName(PlanName);
  // console.log('Membershipp Plan by Name filter', membershipPlan)
  if (membershipPlan === null){
    return false
  }

  try {
    //   Update it
    await UserMembership.update(
      {
        MembershipPlanID: membershipPlan.id,
      },
      {
        where: {
          UserAccountMembershipID: userID,
        },
      }
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
getAllMembershipPlan,
  getMembershipPlanByName,
  UserCurrentSubscription,
  changeSubcription,
};
 