const { User, BusinessRegistration } = require("../../../Database/models");

const getUserbyID = async (obj) => {
  const theUser = User.findOne({
    where: {
      id: obj,
    },
    attributes: ["Username", "Email", "id"],
  });
  return theUser;
};

const getBusinessRegistrationModelbyID = async (obj) => {
  const theModel = BusinessRegistration.findOne({
    where: {
      id: obj,
    },
    attributes: ["BusinessName", "OptionalBusinessName", "id"],
  });

  if (theModel === null) {
    return false;
  }

  return theModel;
};

const registerBusinessName = async (userID, data) => {
  const { Name1, Name2 } = data;

  if (Name1 && Name2 === null) {
    return false;
  }

  try {
    await BusinessRegistration.create({
      BusinessName: Name1,
      OptionalBusinessName: Name2,
    });
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUserBusinessRegistrationDetails = async(userID , businessID)=>{
    const UserBusinessModel = await BusinessRegistration.findOne({
        where:{
            UserAccountID : userID ,
        id : businessID
        }
    })

    if (UserBusinessModel === null){
        return null
    }

    return UserBusinessModel
}

// If Business Name is valid
const createBusinessRegField = async (data, userID) => {
  const {
    BusinessName,
    BusinessNameTwo,
    IDfile,
    IDtype,
    PassportOne,
    PassportTwo,
    BusinessPhone,
    BusinessEmail,
    OwnerFullName,
    BusinessAddress,
  } = data;

  try {
    await BusinessRegistration.create({
      UserAccountID: userID,
      BusinessName: BusinessName,
      OptionalBusinessName: BusinessNameTwo,
      ProprietorName: OwnerFullName,
      IdentificationType: IDtype,
      IdentificationFile: IDfile,
      PassportPhotoOne: PassportOne,
      PassportPhotoTwo: PassportTwo,
      BusinessAddress: BusinessAddress,
      BusinessPhone: BusinessPhone,
      BusinessEmail: BusinessEmail,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getUserbyID,
  getBusinessRegistrationModelbyID,
  registerBusinessName,
  createBusinessRegField ,
  getUserBusinessRegistrationDetails
};
