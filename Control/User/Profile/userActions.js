const { User ,Profile } = require("../../../Database/models");

const getUserbyID = async (obj) => {
  const theUser = User.findOne({
    where: {
      id: obj,
    },
    attributes: ["Username", "Email", "id"],
  });
  return theUser;
};

const getUserProfilebyUserID = async (id) => {
 const fetchProfile = await Profile.findOne({
    where: {
      UserAccountID :id
    } , attributes : ['Bio','Phone','BusinessAddress']
  })

  if (fetchProfile === null){
    return false
  }
  return fetchProfile
};

// Creates User Profile
const createProfile = async(userID,details)=>{
  const { PhoneNumber, Address ,Bio } = details;

  if (PhoneNumber && Address && Bio == null){
    return false
  }

  // GET USER PROFILE
  const theUser = await getUserbyID(userID)

  if (theUser === null){
    return false
  }
  
  // CHECK IF PROFILE EXISTS
  const profileCheck = await Profile.findOne({
    where:{
      UserAccountID : userID
    },
    attributes : ['UserAccountID','Bio','BusinessAddress','id']
  })

  if (profileCheck !== null){
    console.log(profileCheck.Bio)
      return null
  }

  try{
      
    await Profile.create({
      UserAccountID :userID,
      Bio : Bio ,
      Phone :PhoneNumber,
      BusinessAddress : Address
    })

  return true

  }catch(e){
    console.log(e)
    return false
  }


}

const editProfile = async (userID, details) => {
  // const fecthUser = getUserbyID(userID);

  const  getUserProfile = await getUserProfilebyUserID(userID)

  if (fecthUser === null) {
    return false;
  }
  const { PhoneNumber, Email, Address, FullName } = details;

  if (PhoneNumber !== null) {
    getUserProfile.update(
      {
        Phone: PhoneNumber,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  if (Email !== null) {
    getUserProfile.update(
      {
        Email: Email,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  if (Address !== null) {
    getUserProfile.update(
      {
        Address: Address,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  if (FullName !== null) {
    getUserProfile.update(
      {
        FullName: FullName,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }
};

module.exports = {
    editProfile,
  createProfile ,
  getUserProfilebyUserID
};
