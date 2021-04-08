const verify = require("../../_jwtSign");
const express = require("express");
const router = express.Router();

const {
  getAllBusinessRegistered,
  getBusinessRegistrationFieldByID,
  changePayementStatus,
  uploadBusinessRegFile,
  changeBusinessNameStatus,
} = require("../../../Control/Admin/BusinessRegistration/businessReg");

router.get("/admin/get-all-business-registered", async (req, res) => {
  const allBuiz = await getAllBusinessRegistered();
  if (allBuiz === null) {
    return res.status(404).json({
      Message: "Data  found",
      code: 404,
      data: [],
    });
  }

  return res.status(200).json({
    Message: "Data  found",
    code: 200,
    data: allBuiz,
  });
});

// Get Business REGistrartion details for user only
router.get("/admin/get-user-business-registration-details", async (req, res) => {
  const { businessID } = req.params;
  // const userID = req.userID.id;

  const fetchDetails = await getBusinessRegistrationFieldByID(businessID);
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

// Get Business REGistrartion details for user only
router.get("/admin/change-business-name-status", async (req, res) => {
    const { isAvailable } = req.params;
    // const userID = req.userID.id;
    const paramsData = req.params
    const updateStatus = await changeBusinessNameStatus(businessID ,paramsData);
    if (updateStatus === false) {
      return res.status(400).json({
        Message: "Data not found",
        data: [],
        code: 400,
      });
    }
    return res.status(200).json({
      Message: "Data found",
      code: 200,
      data: "",
    });
  });
  


// Change Payment status  Via callback from payment Gateway
router.get("/admin/update-business-name-reg-payment-status", async (req, res) => {
    const {businessID} = req.params
    
    const updatePayment = await changePayementStatus(businessID);
    if (updatePayment === false) {
      return res.status(404).json({
        Message: "Error updating payment",
        code: 404,
        data: "",
      });
    }
  
    return res.status(200).json({
      Message: "Data  found",
      code: 200,
      data: "Payement Updated",
    });
  });

// YUpload Certificate
router.post("/admin/update-business-file", async (req, res) => {
    const {businessID } = req.body
    const {CertificateFile} = req.files

    const updatePayment = await uploadBusinessRegFile(businessID , CertificateFile);
    if (updatePayment === false) {
      return res.status(404).json({
        Message: "Error Upload document",
        code: 404,
        data: [],
      });
    }
  
    return res.status(200).json({
      Message: "Data Uploaded Successfully",
      code: 200,
      data:"",
    });
  });
  

  module.exports = router;

  