const {
  getAllProducts,
  getProductDetails,
  getProductbyFilter,
  getProductByBasicSearch,
  getProductsbyCategory,
} = require("../../Control/User/Marketplace/ProductListingActions");

const {
  RandomizeSubscribedUsersProduct,
  getMembershipPlanByName,
} = require("../../Control/User/Marketplace/ProductSorting");

const {
  getAllPromotion,
  getPromotionDetails,
  createPromotion,
} = require("../../Control/User/Marketplace/Promotions/PromotionActions");
const express = require("express");
const verify = require("../_jwtSign");
const { ProductItem } = require("../../Database/models");
const router = express.Router();

router.get("/get-all-produtcs", async (req, res) => {
  const theProducts = await getAllProducts();
  if (theProducts === false) {
    return res.status(400).json({
      message: "Marketplace is empty",
      data: [],
    });
  }
  return res.status(200).json({
    message: "Marketplace has items",
    data: theProducts,
  });
});

router.get("/get-product-details", async (req, res) => {
  const { productID } = req.query;

  if (productID === null) {
    return res.status(401).json({
      message: "Product not found",
      data: [],
    });
  }

  // Gets product detail by ID
  const theProduct = await getProductDetails(productID);

  if (theProduct === null) {
    return res.status(401).json({
      message: "Product not found",
      data: [],
    });
  }

  return res.status(200).json({
    message: "Product is available",
    data: theProduct,
  });
});

router.get("/get-product-by-category", async (req, res) => {
  const queryData = req.query;
  const theResult = await getProductsbyCategory((data = queryData));
  if (theResult === false) {
    return res.status(401).json({
      message: "Product not found",
      data: [],
    });
  }

  return res.status(200).json({
    message: "Product is available",
    data: theResult,
  });
});

// ----Gets Products by Title and state  search----///
router.post("/get-product-by-search", async (req, res) => {
  // const {Title,State} = req.body
  const queryData = req.body;
  const theResult = await getProductByBasicSearch((data = queryData));
  if (theResult === false) {
    return res.status(401).json({
      message: "Product not found",
      data: [],
    });
  }

  return res.status(200).json({
    message: "Product is available",
    data: theResult,
  });
});

router.post("/get-product-by-filter", async (req, res) => {
  const queryData = req.body;
  const theResult = await getProductbyFilter((data = queryData));
  if (theResult === false) {
    return res.status(401).json({
      message: "Product not found",
      data: [],
    });
  }

  return res.status(200).json({
    message: "Product is available",
    data: theResult,
  });
});

router.get("/get-product-by-priority", async (req, res) => {
  const theProducts = await RandomizeSubscribedUsersProduct();
  if (theProducts === null) {
    return res.status(400).json({
      Products: [],
    });
  }
  console.log(theProducts);
  return res.status(200).json({
    Products: theProducts,
  });
});

router.get("/get-product-by-plan-name", async (req, res) => {
  const { PlanName } = req.query;
  const theProducts = await getMembershipPlanByName(PlanName);
  if (theProducts === null) {
    return res.status(400).json({
      Products: [],
    });
  }

  return res.status(200).json({
    Products: theProducts,
  });


});

router.get("/get-promotions", async (req, res) => {
  const theDeals = await getAllPromotion();
  if (theDeals === false){
    return res.json({
        deals : []
    })
  }
  return res.json({
      deals : theDeals
  })
});



router.post('/create-deal-item/',verify, async(req,res)=>{
    const userID = req.userID.id;
    const requestContent  =  req.body
    const {Image1 ,Image2} = req.files

    console.log(req.files)

    // console.log(req.body)
    const processDealsItem = await createPromotion(userID,data = requestContent , ImageFile = Image1)
    // const processMarketPlaceItem = true
    if (processDealsItem === false){
        return res.status(400).json({
            msg :'Error Creating Item'
        })
    }

    return res.status(200).json({
        Message: 'Upload Successful',
      });
})


module.exports = router;
