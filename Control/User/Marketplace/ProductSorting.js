const { Op } = require("sequelize");
const { ProductItem, MembershipPlan } = require("../../../Database/models");

const getMembershipPlanByName = async (planName) => {
  const thePlan = await MembershipPlan.findOne({
    where: {
      PlanName: planName,
    },
    attributes: ["PlanName", "id"],
  });


  if (thePlan === null) {
    return null;
  }
  console.log('thePlan',thePlan);

  return thePlan;
};


const RandomizeSubscribedUsersProduct = async () => {

  //------------------- Gold Users Product------------------
  const getProductsFromGoldUsers = await getMembershipPlanByName(planName = "Gold");


  // --------------Silver Users Product--------------
  const getProductsFromSilver = await getMembershipPlanByName(planName = "Silver")


  // -------------------Bronze Users Product-------
  const getProductFromBronze = await getMembershipPlanByName(planName = "Bronze")

  //----------------- Gold Users Product-----------

  let HighProirityProducts = await ProductItem.findAll({
    where: {
      ProductOwnerMembershipID: getProductsFromGoldUsers.id,
    },
  });

  if (HighProirityProducts === null) {
    HighProirityProducts =  [];
  }

  //--------------- Silver Users Product-----------------

  let MediumProirityProduts = await  ProductItem.findAll({
    where: {
      ProductOwnerMembershipID: getProductsFromSilver.id,
    },
  });

  if (MediumProirityProduts === null) {
    MediumProirityProduts =  [];
  }

  //--------------Bronnze Users Product---------------

  let LowPriorityProduct = await  ProductItem.findAll({
    where: {
      ProductOwnerMembershipID: getProductsFromSilver.id,
    },
  });

  if (LowPriorityProduct === null) {
    LowPriorityProduct =  [];
  }

  const ProductsDict = {
    HighPriorityProducts: HighProirityProducts.sort(() => Math.random() - 0.5),
    MediumPriorityProducts: MediumProirityProduts.sort(() => Math.random() - 0.5 ),
    LowPriorityProducts: LowPriorityProduct.sort(() => Math.random() - 0.5),
  };

  // console.log('ProductsDict',ProductsDict)

  return ProductsDict;
};

// return allProducts.sort( () => Math.random() - 0.5)

module.exports = {
  RandomizeSubscribedUsersProduct,getMembershipPlanByName
};
