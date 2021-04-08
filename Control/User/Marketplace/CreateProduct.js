const { ProductItem } = require("../../../Database/models");
const { UserCurrentSubscription } = require("../Profile/subscriptions");
const { PostToSocialMedia } = require("./SocialMediaIntergration");

const aws = require("aws-sdk");
const s3 = new aws.S3();

const fs = require("fs");

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION_NAME,
});

// ------------- CREATE ELECTRONICS ITEM --------------------------//
const CreateElectronics = async (userID, data, ImageFile) => {
  const UserID = userID;
  const {
    SubCategory,
    Address,
    LocalGovermentArea,
    Description,
    Price,
    Category,
    Brand,
    Condition,
    Image1,
    Image2,
    State,
    Country,
    Title,
  } = data;

  // Get the User plan
  let userPlan = await UserCurrentSubscription(userID);


  console.log("The Data", data);
  try {
    const params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Body: fs.createReadStream(ImageFile.tempFilePath),
      Key: `${"Enterprise-Images/ProductImages"}/${ImageFile.name}`,
      ContentType: ImageFile.mimetype,
      ACL: "public-read",
    };

    const beginUpload = await s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error Uploading Item");
        return null;
      }
      if (data) {
        console.log("the Profile picture Data", data.Location);

        ProductItem.create({
          ProductForUserID: UserID,
          Title: Title,
          Category: Category,
          Description: Description,
          Price: Price,
          Address: Address,
          LGA: LocalGovermentArea,
          Image1: data.Location,
          ProductOwnerMembershipID: userPlan["MembershipPlan"].id,
          State: State,
          Country: Country,

          // Image2 : Image2Link
        });

        // Social Media Integration
        try {
          let postData = {
            Title: Title,
            ImageUrl: data.Location,
          };
          console.log("Post Data", postData);
          console.log('Uploading  to social media')
          PostToSocialMedia(userID, postData);
        } catch (e) {
          console.log(e);
          console.log("tried posting to social media");
          return true;
        }
        return data.Location;
      }
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// ------------- CREATE FASHION ITEM --------------------------//
const createFashionItem = async (userID, data, ImageFile) => {
  const UserID = userID;

  const {
    Category,
    SubCategory,
    Address,
    LGA,
    Description,
    Price,
    Brand,
    State,
    Gender,
    Size,
    Title,
    Country,
  } = data;
  // Get the User plan
  const userPlan = await UserCurrentSubscription(userID);

  console.log("The Data", data);

  try {
    // ------------ STORE DATA INTO DB HERE---------------------///
    const params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Body: fs.createReadStream(ImageFile.tempFilePath),
      Key: `${"Enterprise-Images/ProductImages"}/${ImageFile.name}`,
      ContentType: ImageFile.mimetype,
      ACL: "public-read",
    };

    await s3.upload(params, async (err, data) => {
      if (err) {
        console.error("Error Uploading Item");
        return null;
      }
      if (data) {
        await ProductItem.create({
          ProductForUserID: UserID,
          Title: Title,
          Description: Description,
          Category: Category,
          Price: Price,
          Address: Address,
          LGA: LGA,
          Image1: data.Location,
          ProductOwnerMembershipID: userPlan["MembershipPlan"].id,
          State: State,
          Country: Country,
          Gender: Gender,
          Brand: Brand,
          SubCategory: SubCategory,
          Size: Size,
        });
      }

          // ------------Social Media Integration---------------------///
    try {
      let postData = {
        Title: Title,
        ImageUrl: data.Location,
      };
      console.log("Post Data", postData);
      PostToSocialMedia(userID, postData);
    } catch (e) {
      console.log(e);
      console.log("tried posting to social media");
      return true;
    }
    // ------------Social Media Integration---------------------///

    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// ------------- CREATE HOME APPLICANCE ITEM --------------------------//
const createHomeApplicanceItem = async (userID, data, ImageFile) => {
  const UserID = userID;

  const {
    Category,
    SubCategory,
    Address,
    LGA,
    Description,
    Price,
    Brand,
    State,
    Condition,
    Title,
    Country,
  } = data;
  // Get the User plan
  const userPlan = await UserCurrentSubscription(userID);

  console.log("The Data", data);

  try {
    // ------------ STORE DATA INTO DB HERE---------------------///
    const params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Body: fs.createReadStream(ImageFile.tempFilePath),
      Key: `${"Enterprise-Images/ProductImages"}/${ImageFile.name}`,
      ContentType: ImageFile.mimetype,
      ACL: "public-read",
    };

    await s3.upload(params, async (err, data) => {
      if (err) {
        console.error("Error Uploading Item");
        return null;
      }
      if (data) {
        await ProductItem.create({
          ProductForUserID: UserID,
          Title: Title,
          Description: Description,
          Category: Category,
          Price: Price,
          Address: Address,
          LGA: LGA,
          Image1: data.Location,
          ProductOwnerMembershipID: userPlan["MembershipPlan"].id,
          State: State,
          Country: Country,
          Brand: Brand[0],
          Condition : Condition,
          SubCategory: SubCategory,
        });
      }

          // ------------Social Media Integration---------------------///
    try {
      let postData = {
        Title: Title,
        ImageUrl: data.Location,
      };
      console.log("Post Data", postData);
      PostToSocialMedia(userID, postData);
    } catch (e) {
      console.log(e);
      console.log("tried posting to social media");
      return true;
    }
    // ------------Social Media Integration---------------------///

    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }


};

// ------------- CREATE PHONES AND TABLET ITEM --------------------------//
const createPhonesAndTableItem = async (userID, data, ImageFile) => {
  const UserID = userID;

  const {
    SubCategory,
    Address,
    LocalGovermentArea,
    Description,
    Price,
    Category,
    Brand,
    Condition,
    Image1,
    Image2,
    State,
    Title,
    Country,
  } = data;
  // Get the User plan
  const userPlan = await UserCurrentSubscription(userID);

  console.log("The Data", data);

  try {
    await ProductItem.create({
      ProductForUserID: UserID,
      Title: Title,
      Category: Category,
      Description: Description,
      Price: Price,
      Address: Address,
      LGA: LocalGovermentArea,
      // Image1: data.Location,
      ProductOwnerMembershipID: userPlan["MembershipPlan"].id,
      State: State,
      Country: Country,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// ------------- CREATE VEHICLE ITEM --------------------------//
const createVehicleItem = async (userID, data, ImageFile) => {
  const UserID = userID;

  const {
    SubCategory,
    Address,
    LocalGovermentArea,
    Description,
    Price,
    Category,
    Brand,
    Condition,
    Image1,
    Image2,
    State,
    Country,
    Title,
  } = data;
  // Get the User plan
  const userPlan = await UserCurrentSubscription(userID);

  console.log("The Data", data);

  try {
    await ProductItem.create({
      ProductForUserID: UserID,
      Title: Title,
      Category: Category,
      Description: Description,
      Price: Price,
      Address: Address,
      LGA: LocalGovermentArea,
      // Image1: data.Location,
      ProductOwnerMembershipID: userPlan["MembershipPlan"].id,
      State: State,
      Country: Country,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  CreateElectronics,
  createFashionItem,
  createHomeApplicanceItem,
  createVehicleItem,
  createPhonesAndTableItem,
};

// HOME FURNITURE , PHONES AND TABLET , VEHICLES
