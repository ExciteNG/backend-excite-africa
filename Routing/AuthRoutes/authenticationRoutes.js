const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

// import passport and passport-jwt modules
const passport = require("passport");
// const myPassport = require("../config/passport");
const passportJWT = require("passport-jwt");

const authControl = require('../../Control/Authentication/authControl');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN_GENERATOR_SECRET,
};

// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = "wowwow";


const {User} = require('../../Database/models')
const router = express.Router();

// create some helper functions to work on the database
const createUser = async (name, password1, email) => {
  const theUser = await User.create({
    Username: name,
    Password: password1,
    Email: email,
  });
  console.log(theUser.Username);
  return theUser.Username;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ["Username", "Email", "id"],
  });
  console.log(JSON.stringify(users));
  return users;
};

const getUser = async (obj) => {
  if (obj === undefined || obj === null){
    return null
  }
  const user = await User.findOne({
    where: {
      Username: obj,
    },
  });
  return user;
 
};

router.get("/all-users", function (req, res) {
  getAllUsers().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/get-user-by-name/", function (req, res) {
  const username = req.query.username;
  getUser(username).then((user) => {
    if (user !== null) {
      res.status(200).json({
        user : user
      });
    } else {
      res.status(401).json({ message: "User Not Found" });
    }
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

getUserSessionID = function (headers) {
  if (headers && headers.sessionUserID) {
    const parted = headers.sessionUserID.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// protected route
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    res.json("Success! You can now see this without a token.");
  }
);

// register route
// const sendEmail = require("../controllers/emailControls");
 
router.post("/register", async function (req, res, next) {
  const { username, password1,password2, email ,fullname,refcode } = req.body;
  console.log(req.body);

  if (password1 == password2){

      var salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(password1, salt);

      console.log("ThE Salt", hash);

      // creates a new user
      
      let newUser = await authControl.registerUser(username , email , fullname,hash, refcode)
    //   sendEmail.sendVerificaionEmail(email);
      console.log('this is the new user',newUser); 
      if (newUser !== false) {
        console.log("the data", username, password1);
        res.status(200).json({ newUser: newUser, msg: "Account created successfully" });
      } else {
        res.status(400).json({ msg: "Username or Email already Exist" });
      }
  }
  else{
    res.status(400).json({ msg: "Password Don`t match" });
  }
 
});

// Login Route
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  if (username && password) {
    let user = await getUser(username);
    user = user;
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }
    console.log(user.Username);
    console.log(user.Password);
    console.log(user.id);

    bcrypt.compare(password, user.Password, function (err, data) {
      if (err) {
        console.log('the err',err);
        console.log("Passwords dont match by");
        res
          .json({ success: false, message: "passwords do not match" })
          .status(400);
      }
      
      if (data) {
        console.log(data);
        console.log("User Found");
        // Send JWT
    

        // SIGN JWT 
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({
          msg: "ok",
          token: token,
          username: user.Username,
          email : user.Email
         
        });
      }
    });
  }
});

// Password Reset Route
router.post("/reset-password/", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  const processEmailReset = await authControl.emailReset(email);
  if (processEmailReset !== null) {
    return res.status(200).json({
      Message: "Reset Password Email Sent",
    });
  } else {
    return res.status(400);
  }
});

// Change Passwordd
router.post("/change-password", async function (req, res, next) {
  const { password1, password2, email } = req.body;
  console.log(req.body)
  if (password1 == password2) {
    var salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password1, salt);
    const initPasswordChange = authControl.processPasswordChanges( email , passwordHash = hash)
    if (initPasswordChange !== null){
      return res.status(200).json({ message: "Password Changed Successfully" });

    }
    return res.status(400).json({ message: "Password Changed Fialed" });


  }

  else{
    return res.status(400).json({ message: "Password Changed Fialed" });

  }

});

module.exports = router;
