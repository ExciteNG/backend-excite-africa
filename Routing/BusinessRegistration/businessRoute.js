const verify = require("../_jwtSign");
const express = require("express");
const router = express.Router();

const {
  getBusinessRegistrationModelbyID,
  registerBusinessName,
  createBusinessRegField,
  getUserBusinessRegistrationDetails,
} = require("../../Control/User/BusinessRegistration/businessReg");

router.get("/get-business-registration-details", async (req, res) => {
  const { businessID } = req.params;

  const fetchDetails = await getBusinessRegistrationModelbyID(businessID);
  if (fetchDetails === false) {
    return res.status(404).json({
      Message: "Data not found",
      data: [],
      code: 200,
    });
  }

  return res.status(200).json({
    Message: "Data  found",
    code: 200,
    data: fetchDetails,
  });
});

// Get Business REGistrartion details for user only
router.get("/get-user-business-registration-details",verify , async (req, res) => {
  const { businessID } = req.params;
  const userID = req.userID.id;

  const fetchDetails = await getUserBusinessRegistrationDetails(userID,businessID);
  if (fetchDetails === false) {
    return res.status(400).json({
      Message: "Data not found",
      data: [],
      code: 400,
    });
  }
  return res.status(200).json({
    Message: "Data found",
    code: 200,
    data: fetchDetails,
  });
});


// Registers a Business Name for reservation
router.post('/register-business-name',verify ,async(req,res)=>{
  const {Name1,Name2} = req.body
  const userID = req.userID.id;

  const initReg = await registerBusinessName(userID ,req.body)
  if (initReg === false){
    return res.status(404).json({
      Message: "Name fields are empty ",
      data: [],
      code: 400,
    });
  }

  return res.status(200).json({
    Message: "Data saved",
    data: [],
    code: 200,
  });

})

// submit registration
router.post("/register-new-business",verify , async (req, res) => {
  const {
    businessName,
    businessDescription,
    businessAddress,
    businessCity,
    businessState,
    businessLGA,
    branchAddress,
    branchCity,
    branchState,
    branchLGA,
    surname,
    firstName,
    otherName,
    formalName,
    gender,
    dob,
    phoneNumber,
    email,
    ownerAddress,
    ownerCity,
    ownerLGA,
    ownerState,
    nationality,
    formalNationality,
    occupation,
    idImg,
    idType,
    idNumber,
    passportImg,
    signature,
  } = req.body;

  // save to database
  const data = req.body
  const saveBusinessData = await createBusinessRegField(data ,userID)
  
  if (saveBusinessData === false){
    return res.status(400).json({
      Message: "Data not saved",
      data: [],
      code: 400,
    });
  }

  return res.status(200).json({
    Message: "Data saved",
    data: [],
    code: 200,
  });

});

// BUSINESS NAME RESERVATION

// user submits reservation
router.post("/check-new-reservation", async (req, res) => {
  const { mostPreferred, morePreferred, other } = req.body;
  const newReservation = {
    MostPreferred: mostPreferred,
    MorePreferred: morePreferred,
    other: other,
    status: false,
    email: "example@gmail.com",
  };
  // continue from here

  //expected response if successfull
  res.json({ code: 200 });
});

// user query list of his/her submision
router.get("/all-my-reservation", async (req, res) => {
  // do some logic to get this user submission

  // then send all his reservation
  res.json({ code: 200, reserves: "put reservations here" });
});

router.post("/update-reservation-status", async (req, res) => {
  res.send("ok");
});

// BUSINESS NAME REGISTRATION



//return all business name submission of this user
router.get("/my-business-name-applications", async (req, res) => {
  // get the email from token

  //expected response
  res.json({ code: 200, applications: "his/her submissions" });
});

module.exports = router;
