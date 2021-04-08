const { Op } = require("sequelize");


const { ProductItem } = require("../../../Database/models");


const getAllProducts = async () => {
  let allProducts = await ProductItem.findAll();
  if (allProducts === null) {
    return false;
  }
  // allProducts.sort( () => Math.random() - 0.5)

  return allProducts;
};

const getProductDetails = async (productID) => {
  const theProduct = ProductItem.findOne({
    
    where: {
      id: productID,
    },
  });

  if (theProduct === null) {
    return false;
  }

  return theProduct;
};

const getProductByBasicSearch = async(data)=>{

  const {Title,State} = data
  console.log(data)

  const searchResult = await ProductItem.findAll({
    where: {
      Title : {
        [Op.like] : `%${Title}%`
      },
      State : {
        [Op.like]: `%${State}%`
      }
    } ,
    attributes : ['id','Title' ,'ProductForUserID','Category',
    'Address','Price','LGA','State','Image1']
  })

  if (searchResult === false){
    return false
  }
  return searchResult
}
 
const getProductbyFilter= async(data)=>{

    const {Title, Price ,Category} = data
    console.log(Category)
    const searchResult = await ProductItem.findAll({
      where: {
        // Title : {
        //   [Op.like]:`%${Title}%`
        // } ,
        Category :{
          [Op.like]:`${Category}`
        } ,
        // Price :{
        //   [Op.like]:`${Price}`
        // } ,
      } ,
      attributes : ['id','Title' ,'ProductForUserID','Category' ,
      'Address','Price','LGA','State','Image1',
      'Brand','Room' ,'SubCategory','Gender']
    })
    
    // console.log('The Search Result',searchResult)


    if (searchResult === false){
      return false
    }

    return searchResult

}

const getProductsbyCategory= async(data)=>{
  const {Category} = data
  const CategoryResult = await ProductItem.findAll({
    where: {
      Category :{
        [Op.like]:`${Category}`
      } ,

    } ,
    attributes : ['id','Title' ,'ProductForUserID','Category' ,
    'Address','Price','LGA','State','Image1',
    'Brand','Room' ,'SubCategory','Gender']
  })
   
  if (CategoryResult === false){
    return false
  }

  return CategoryResult

}


module.exports = {
  getAllProducts,
  getProductDetails,
  getProductbyFilter ,
  getProductByBasicSearch ,
  getProductsbyCategory ,
  
};
