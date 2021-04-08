const { Op } = require("sequelize");
const axios = require("axios");
const { ProductItem, Profile, User } = require("../../../Database/models");
const { UserCurrentSubscription } = require("../Profile/subscriptions");

const API_KEY = "DK9XQB2-FRG4RPK-QB2905F-6AQ1XE5";
const postMsg = "Today is a great day!";

const social_media_link =
  "https://app.ayrshare.com/social-accounts?domain=exciteafrica&jwt=TOKEN";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCM/SHKWzw+8Qa9SuikDMmi/n60pu1uva3iqvAjTqSnDGUx8FWA
a2FRufJVFTKO2PqbRU7DYawPhr7LyzW89n1jr10qqsKyeeuWG+kJ41WvY3nJ2KMq
/kLb8YvoVUqJ6TgrMz1ogRH52IddbGWzumSHUF0w1vwn7u7PEfcqIZ2OpQIDAQAB
AoGABhuFFjYDkxpv101ibJDdP0FVDdBZYr22xaXwByeF/HKOA67MlWaRba/nboYf
jY6atJU5Bz+462dD5qIj7s6iudlNxxlrWQLRd76cKzNgvjkajP7MRwsaTcaE1oN4
o2d5xFREYB/K1t2h/MD/7S8fP++dXq80FHr5ILHhlmKQQlUCQQDAl5Gqr1X5KtlY
G8XBeYJW9hNVTXX72+PtqGCUVo8VcK8FHQgKS6eFDCEKsc7lB6ngagS+9LZfmQs5
tFukKGP7AkEAu2g7kE+8+P/83tyFuob/tLTwMSm3lxDGWJiA9oB63LDeji/Z6UwU
EH8UE18ddRwGkXdtsBTRUYMPxPBGUNq13wJAYmkQtfcCJ2ANz0fhtQsx3t2+40fB
kgC6ZyYys5nHY11BEYvUH+6omwOnnp9c6QsRcuq5ohnJVvANHF9ctHUvIQJBAJu/
upDq1ACUrtGAsFseyvCh12TkaMHRnSYQSE2U5Yb4L144AoBTS/GRy1t2FwM28XZ/
rNdD1dpKdBaWIbocqj0CQQCNxZhaExOhFGRoPYjQekHEX4fFQyniuOlEcXwnJ3uV
LxNDLcAI0b568RE+yGXfqNyeT+qU/dbOM/vOsES3wfX9
-----END RSA PRIVATE KEY-----`;

function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const getUserbyID = async (obj) => {
  const theUser = User.findOne({
    where: {
      id: obj,
    },
    attributes: ["Username", "Email", "id"],
  });
  return theUser;
};

const createProfileKey = async (userEmail) => {
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const endpoint = "https://app.ayrshare.com/api/profiles/create-profile";
  const theProfileKey = await axios
    .post(endpoint, {
      title: userEmail,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data["profileKey"];
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

  return theProfileKey;
};

const createJWTtoken = async (userProfileKey) => {
  const profileKey = userProfileKey;

  const endpoint = "https://app.ayrshare.com/api/profiles/generateJWT";

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const theToken = await axios
    .post(endpoint, {
      domain: "exciteafrica",
      privateKey: privateKey,
      apiKey: API_KEY,
      profileKey: userProfileKey,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data["token"];
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

  return theToken;
};

const StoreUserSocailInformation = async (userID) => {
  // Get the User plan
  const userPlan = await UserCurrentSubscription(userID);
  if (userPlan["MembershipPlan"].PlanName === "Gold") {
    // GET THE USER DETIALS FROM DB
    const userDetails = await getUserbyID(userID);

    // Create Profle Key
    const theProfileKey = await createProfileKey(userDetails.Email);

    // Store into DB
    try {
      console.log("Storing into Profile Key DB");
      await Profile.update(
        {
          AnyshareProfileKey: theProfileKey,
        },
        {
          where: {
            UserAccountID: userID,
          },
        }
      );
    } catch (e) {
      console.log("Failed When Updating Profile Key");
      console.log(e);
      return false;
    }

    // -------------Create JWT Social kEY ------------ //
    try {
      const theJWT = await createJWTtoken(theProfileKey);
      const context = {
        JWTtoken: theJWT,
      };
      return context;
    } catch (e) {
      console.log("Failed When Updating JWT SOCIAL Key");

      console.log(e);
      return false;
    }
  }
  //-----------
  else {
    console.log("User is not subscribed for this plan");
    return false;
  }
};

const PostToSocialMedia = async (userID, data) => {
  console.log('ThIS is the UserID for Upload',userID)
  const { Title, ImageUrl } = data;

  console.log("The Data for posting", data);
  const userPlan = await UserCurrentSubscription(userID);


  if (userPlan["MembershipPlan"].PlanName === "Gold") {
    console.log('User is subscribed for this ')
    const profileDetails = await Profile.findOne({
      where: {
        UserAccountID: userID,
      },
    });


    if (profileDetails === null) {
      console.log('User is ull')
      return null;
    }

    if (profileDetails.AnyshareProfileKey === null) {
      console.log('Profile Key is NULL')
      return false;
    }
    
    console.log('PRPOFIRLE--- ',profileDetails.AnyshareProfileKey)

    // ------- UPLOADING STARTS HERE ------------- //
    const endpoint = "https://app.ayrshare.com/api/post";

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    console.log('uploading`....')
    await axios
      .post(endpoint, {
        post: Title, // required
        platforms: ["facebook"], // required
        profileKeys: [profileDetails.AnyshareProfileKey], // required for client posting
        media_urls: [ImageUrl], //optional
        shorten_links: true, // optional
        // unsplash: "random", // optional
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          console.log("wokred");
          return true;
        } else {
          console.log("failed to post on social media");
          return false;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });

    return true;
  } else {
    console.log('User is not subscribe to Gold Plan')
    return false;
  }
};

module.exports = {
  StoreUserSocailInformation,
  PostToSocialMedia,
};
