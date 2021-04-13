// Author: Victor Okpon

const  { sequelize, Adbanners } = require("../../database/models");

exports.createBanner = async (req, res) => {

    const { categories, purpose, banner} = req.body;
      
      try {
          let newBanner = await Adbanners.create({
              categories,
              purpose,
              banner,
              approval: false
          });
          console.log('banner created');
          return res.status(200).json(newBanner)
      } catch (error) {
          console.log(error);
          return res.status(500).json(error);          
      }
}

exports.updateBanner = async (req, res) => {
    const { categories, purpose, banner, approval} = req.body;
    const { id } = req.params;
      
      try {
          let newBanner = await Adbanners.update({
              categories,
              purpose,
              banner,
              approval
          },
          {where: {id}}
          );
          const updatedBanner = await Adbanners.findOne({where: {id}});
          return res.status(201).json({
              mesagae: "banner updated successfully!",
              result: updatedBanner
          })
      } catch (error) {
          console.log(error);
          return res.status(500).json(error);          
      }
}

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Adbanners.findAll();
        return res.status(200).json(banners);
    } catch (error) {
        return res.status(500).send("No banners available!");
    }
}

exports.getOneBanner = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await Adbanners.findOne({ where: {id} });
        if (banner) {
            return res.status(200).json(banner);
        }        
        return res.status(404).json({messsage: "Banner does not exist!"}); 
    } catch (error) {   
        return res.status(500).json(error);
    }
}

exports.deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await Adbanners.findOne({ where: {id}});
        banner.destroy();
        return res.status(200).json({ message: "Banner deleted successfully!"});
    } catch (error) {
        return res.status(500).json(error);        
    }
}

