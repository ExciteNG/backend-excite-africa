const uuid = require("uuid");
const aws  = require("aws-sdk");
const fs = require('fs')


// Get and set file upload URL link


const AWSFileUpload = async(file)=>{

  let  FileAWSLink= {
    Link : null,
    AllowLink : false,
    set LinkCommit(value){
      this.Link = value
    },
    set AllowLinkPass(value){
      this.AllowLink = value
    }
  }


    aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION_NAME,
  });


    // console.log(file)
    const s3 = new aws.S3();
    const params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Body: fs.createReadStream(file.tempFilePath),
      Key: `${"Enterprise-Images/ProductImages"}/${file.name}`,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    
    while (FileAWSLink.AllowLinkPass === false){
      let increment = 1
      console.log(increment)
      const beginUpload = await s3.upload(params, async (err, data) => {
        if (err) {
          console.error("Error Uploading Item");
          return null;
        }
        if (data) {
          // console.log("the Profile picture Data", data.Location);    
          FileAWSLink.LinkCommit = data.Location
          console.log('This is thhe Link by setter',FileAWSLink.Link)
          FileAWSLink.AllowLinkPass = true
          console.log(FileAWSLink.AllowLink)
          return data.Location;
        }
      });

      // return FileAWSLink.Link
    }

    if (FileAWSLink.AllowLinkPass === true){
      console.log('Link can now be allowed')
    }


    
}

module.exports = {
    AWSFileUpload
}