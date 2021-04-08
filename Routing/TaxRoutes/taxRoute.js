const express = require("express");
const router = express.Router();

// Post tax
router.post("/new", async (req, res) => {
  const { payerName, payerAddress, natureBusiness, rcNumber, taxType, tin, from, to, amount } = req.body;
  const taxPayer = {
    PayerName: payerName,
    PayerAddress: payerAddress,
    NatureBusiness: natureBusiness,
    RcNumber: rcNumber,
    TaxType: taxType,
    Tin: tin,
    From: from,
    To: to,
    Amount: amount
  }
  // handle post to database here
  await res.status(200).json({
    message: "Tax POST route working!",
    info: taxPayer
    });
});

router.get("/all", async (req, res) => {
  // handle fetch all tax records from database here.
  await res.status(200).json({ message: "Tax GET route working!"})
});

module.exports = router;
