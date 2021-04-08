const fetch = require("node-fetch");
const API_KEY = "DK9XQB2-FRG4RPK-QB2905F-6AQ1XE5";
const postMsg = "Today is a great day!";

const social_media_link = 'https://app.ayrshare.com/social-accounts?domain=exciteafrica&jwt=TOKEN'

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
-----END RSA PRIVATE KEY-----`

const createProfile = (title) => {

  fetch("https://app.ayrshare.com/api/profiles/create-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      title: title, // required
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(console.error);
};

const generateJWT = (privateKey,userProfileKey) => {
  fetch("https://app.ayrshare.com/api/profiles/generateJWT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      domain: "exciteafricA", // required
      privateKey: privateKey, // required
      apiKey: API_KEY, // required
      profileKey: userProfileKey, // required
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(console.error);
};

const post = () => {
  fetch("https://app.ayrshare.com/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      post: postMsg, // required
      platforms: ["twitter", "facebook", "instagram", "linkedin"], // required
      profileKeys: ["PROFILE_KEY"], // required for client posting
      media_urls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"], //optional
      shorten_links: true, // optional
      unsplash: "random", // optional
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(console.error);
};

