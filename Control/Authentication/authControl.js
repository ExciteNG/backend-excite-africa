const express = require("express");
const fs = require("fs");
const axios = require("axios");
const { User ,UserMembership ,MembershipPlan ,Profile } = require("../../Database/models");
// const emailSender = require("./emailControls");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// create some helper functions to work on the database
const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async (username) => {
  const theUser = User.findOne({
    where: {
      Username: username,
    },
  });
  return theUser;
};

// Registers A User
let registerUser = async (username,email, fullName, password,refcode
  // affliateCode
) => {
  try {

    const checkIfUserExist = await User.findOne({
      where:{
        Email : email
      }
    })

    if (checkIfUserExist !== null){
      return false
    }
    // Create User
    const userData = await User.create({
      Username: username,
      Email: email,
      FullName: fullName,
      Password: password,
      refcode:refcode
    });

    // Create Subscription
    console.log(userData.id)
    console.log(userData.FullName)

    const getDefaultSubscription = await MembershipPlan.findOne({
      where: {
        PlanName : 'Free'
      }
    })

    // Create User Membership
    await UserMembership.create({
      UserAccountMembershipID : userData.id,
      MembershipPlanID : getDefaultSubscription.id ,
    })

    // Create User Profile
    const [user, created] = await Profile.findOrCreate({
      where :{
        UserAccountID : userData.id
      }
    })
    console.log('User Account ID for Profile',user.UserAccountID)
    console.log('Profile Created',created)

    

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Login


// Email Reset And Email Verification

function generateEmaIlResetID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Sends Code
const emailReset = async (theEmail) => {
  console.log(theEmail);
  const scanEmail = await User.findOne({
    where: {
      Email: theEmail,
    },
    attributes: ["Email", "id"],
  });

  if (scanEmail !== null) {
    console.log("This is the email for reset", scanEmail.Email);
    const getPin = await generateEmaIlResetID(9);
    // const sendEmail = await emailSender.passwordResetEmail(theEmail, getPin);
    return true;
  } else {
    return false;
  }
};

// Change Password
 
const getUserViaEmail = async (obj) => {
  const user = await User.findOne({
    where: {
      Email: obj,
    },
    attributes: ["Username", "Email"],
  });
  return user;
};

const processPasswordChanges = async (email, passwordHash) => {
  const getUser = await User.findOne({
    where: {
      Email: email,
    },
    attributes: ["Username", "Email"],
  });

  if (getUser !== null) {
    //  Update the Password
    User.update(
      { Password: passwordHash },
      {
        where: {
          Email: email,
        },
      }
    );
    console.log("Password Changed Successfully")
    ;
    return true;
  } else {
    console.log("Password Change Failed");

    return null;
  }
};

module.exports = {
  registerUser ,
  emailReset,
  getUserViaEmail,
  processPasswordChanges,
  getAllUsers,
  getUser,
};
