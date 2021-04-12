const jwt = require("jsonwebtoken");
///const config = require("../config/auth.config.js");
const db = require("../Database/models");
const authJwt = require('../Database/config/jwt')
const Affiliate = db.affiliate;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, authJwt.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken