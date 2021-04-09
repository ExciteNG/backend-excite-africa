const express = reuire("express");
const verify  = require("../../_jwtSign");
const router = express.Router();

// Banner POST route
router.post('new/', verify, async(req, res) => {
console.log('place holder at banner');
});

module.exports = router;
