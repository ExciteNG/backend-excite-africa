const aws  = require("aws-sdk");
const fs = require('fs')


aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION_NAME,
});



router.post('/upload-profile-pic',async(req, res)=>{

    const userID = req.headers["sessionuserid"];
  const imageFile = req.files.profileImage

  const s3 = new aws.S3();
  const params = {
    Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    Body: fs.createReadStream(imageFile.tempFilePath),
    Key: `${"eventsImage"}/${imageFile.name}`,
    ContentType: imageFile.mimetype,
    ACL: "public-read",
  };

  
 const beginUpload = await s3.upload(params, (err, data) => { 
    if (err) {
      console.error("Error Uploading Item");
      return null;
    }
    if (data) {
      console.log("the Profile picture Data", data.Location);
    
      User.update({ProfileImage : data.Location},{
        where: {
          id : userID
        }
      })
    
      return data.Location;
    }
  });

  if (beginUpload !== null){
    return res.status(200).json({
        message:'Uploaded Successfully'
    })
  }else{
      console.log('Error Uploading Data')
      return null
  }



})
