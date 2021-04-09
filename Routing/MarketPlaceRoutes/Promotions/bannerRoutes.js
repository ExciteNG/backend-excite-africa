const express = require("express");
const router = express.Router();

// Post tax
router.post("/new", async (req, res) => {
  const { category, purpose, banner, approvedStatus } = req.body;
  const bannerAdd = {
    Category: category,
    Purpose: purpose,
    banner: banner,
    ApprovedStatus: approvedStatus,
    dateCreated: Date.now()
  }
  // handle post to database here
  await res.status(200).json({
    message: "POST route working!",
    info: bannerAdd
    });
});

router.get("/all", async (req, res) => {
  // handle fetch all tax records from database here.
  await res.status(200).json({ message: "GET route working!"})
});

module.exports = router;
