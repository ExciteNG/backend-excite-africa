const { Op } = require("sequelize");
const { PromotionItem } = require("../../../../Database/models");
const { UserCurrentSubscription } = require("../../Profile/subscriptions");

const aws = require("aws-sdk");
const s3 = new aws.S3();
const fs = require('fs')


const createPromotion = async (userID, data, ImageFile) => {
  const userPlan = await UserCurrentSubscription(userID);

  const UserID = userID;
  const {
    SubCategory,
    Address,
    Description,
    Price,
    Category,
    Brand,
    Title,
  } = data;

  // ------------ STORE DATA INTO DB HERE---------------------///
  const params = {
    Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    Body: fs.createReadStream(ImageFile.tempFilePath),
    Key: `${"Enterprise-Images/ProductImages"}/${ImageFile.name}`,
    ContentType: ImageFile.mimetype,
    ACL: "public-read",
  };


  try {
    await s3.upload(params, async (err, data) => {
        if (err) {
          console.error("Error Uploading Item");
          return null;
        }
        if (data) {
            console.log('Uploading')
            await PromotionItem.create({
                PromotionItemUserID: UserID,
                Title: Title,
                Description: Description,
                Category: Category,
                Price: Price,
                // Address: Address,
                Image1: data.Location,
                PromotionItemOwnerMembershipID: userPlan["MembershipPlan"].id,
                // State: State,
                // Country: Country,
                // Brand: Brand[0],
                SubCategory: SubCategory,
              });
        }
    });
    return true
  } catch (error) {
    console.log(error)
    return false
  }

};

const getAllPromotion = async () => {
  let allProducts = await PromotionItem.findAll();
  if (allProducts === null) {
    return false;
  }
  // allProducts.sort( () => Math.random() - 0.5)

  return allProducts;
};

const getPromotionDetails = async (productID) => {
  const theProduct = PromotionItem.findOne({
    where: {
      id: productID,
    },
  });

  if (theProduct === null) {
    return false;
  }

  return theProduct;
};


const getUsersDeals = async (userID) => {
  const theProduct = PromotionItem.findOne({
    where: {
      PromotionItemUserID: userID,
    },
  });

  if (theProduct === null) {
    return false;
  }

  return theProduct;
};

module.exports ={
    getAllPromotion ,getPromotionDetails,
    createPromotion ,getUsersDeals

}