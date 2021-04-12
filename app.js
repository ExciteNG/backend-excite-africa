const express = require("express");
const app = express();
var session = require("express-session");
const postgresDB = require("./Database/models/index");
var cors = require("cors"); //import cors module
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const multer = require('multer');
const fileUpload =  require('express-fileupload')
const { Client } = require('pg');
//connect to heroku db

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


var ip = require("ip");
const jwt = require("jsonwebtoken");
const { User } = require("./Database/models");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"


// Middleware
require('dotenv').config({path: __dirname + '/.env'})
let logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser")

// CORS CONFIGURATION CONTROL
// Set headers to prevent cors error.
//
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// var whitelist = ["*"]; //white list consumers
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   },
//   methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "device-remember-token",
//     "sessionuserid",
//     "Access-Control-Allow-Origin",
//     "Origin",
//     "Accept",
//   ],
// };

// app.use(cors({credentials:true}));

// app.use(express.json())
app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/x-www-form-urlencoded

// Port
const PORT = process.env.PORT || 5000;
// const PORT = 5000

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// ---------------------ROUTERS -----------------------------------//


const AuthRoutes = require('./Routing/AuthRoutes/authenticationRoutes')
const SubscriptionRoutes = require('./Routing/UserRoutes/subscriptionRoute')
const MarketplaceItemCreationRoutes = require('./Routing/MarketPlaceRoutes/productionCreationRoute')
const MarketPlaceRoutes = require('./Routing/MarketPlaceRoutes//productListingRoute')
const promotionsRoutes = require('./Routing/MarketPlaceRoutes/Promotions/promotionRoutes')
const UserRoutes = require('./Routing/UserRoutes/userRouting')
const SocialLogin = require('./Routing/MarketPlaceRoutes/socialRoutes')
const VerificatitonRouter = require('./Routing/AuthRoutes/verificationRoute')
const businessRoute = require("./Routing/BusinessRegistration/businessRoute")
const TaxRouter = require("./Routing/TaxRoutes/taxRoute");
const BannerRoutes = require('./Routing/MarketPlaceRoutes/Promotions/bannerRoutes')
const AffiliateRoute = require('./Routing/AffliateRouting/affliateRouting');


// ---------------------ROUTERS  ENDS -----------------------------------//

// Sync DB With APP
postgresDB.sequelize
  .sync()
  .then(function () {

    console.log("Server Started");

    //Use Middleware and Routes;
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './Uploads/'
     }));

    //  Session Middleware
    app.use(
      session({
        
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
          expires: 600000,
        },
      })
    );

    // Routes

    // ---Main Rouer ---//

    app.use("/auth", AuthRoutes);
    app.use('/verification',VerificatitonRouter)
    app.use('/subscription',SubscriptionRoutes);
    app.use('/marketplace-create',MarketplaceItemCreationRoutes)
    app.use('/marketplace',MarketPlaceRoutes)
    app.use('/promotions',promotionsRoutes)
    app.use('/profile',UserRoutes)
    app.use('/social/',SocialLogin)
    app.use('/business-application',businessRoute)
    app.use("/tax", TaxRouter)
    app.use("/banner", BannerRoutes)
    app.use('/affiliate',AffiliateRoute)

    // RUN APP
    app.listen(PORT,()=>{
      console.log('port is running')
    })
  })
  .catch((e) => {
    console.log(e);
    console.log("Failed to start server");
  });
