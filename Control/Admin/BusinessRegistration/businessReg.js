const { Op } = require("sequelize");
const axios = require("axios");

const { User, BusinessRegistration } = require("../../../Database/models");

const aws = require("aws-sdk");
const s3 = new aws.S3();

const fs = require("fs");

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION_NAME,
});

const getAllBusinessRegistered = async () => {
  const theBusniessList = BusinessRegistration.findAll({
    attributes: [
      "id",
      "BusinessName",
      "OptionalBusinessName",
      "ProprietorName",
    ],
  });
  if (theBusniessList === null) {
    return null;
  } else {
    return theBusniessList;
  }
};

const getBusinessRegistrationFieldByID = async (businessID) => {
  const theBusniessListData = BusinessRegistration.findOne({
    where: {
      id: businessID,
    },
    attributes: [
      "id",
      "BusinessName",
      "OptionalBusinessName",
      "ProprietorName",
    ],
  });
  if (theBusniessListData === null) {
    return null;
  } else {
    return theBusniessListData;
  }
};

const changePayementStatus = async (businessID) => {
  const businessModel = await getBusinessRegistrationModelbyID(businessID);
  if (businessModel === false) {
    return false;
  }
  await BusinessRegistration.update(
    {
      isPaid: true,
    },
    {
      where: {
        id: businessModel.id,
      },
    }
  );

  return true;
};

const uploadBusinessRegFile = async (businessID, CertificateFile) => {
  const businessModel = await getBusinessRegistrationModelbyID(businessID);
  if (businessModel === false) {
    return false;
  }

  const params = {
    Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    Body: fs.createReadStream(CertificateFile.tempFilePath),
    Key: `${"Enterprise-Images/ProductImages"}/${CertificateFile.name}`,
    ContentType: CertificateFile.mimetype,
    ACL: "public-read",
  };

  const initUpload = await s3.upload(params, async (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }

    if (data) {
      console.log(data.Location);
      // Add a fuctiion here for notification or webhook
      await BusinessRegistration.update(
        {
          CertificateFile: data.Location,
        },
        {
          where: {
            id: businessModel.id,
          },
        }
      );
      return true;
    }
  });

  if (initUpload === false) {
    return false;
  }
  return true;
};

const changeBusinessNameStatus = async (businessID, data) => {
  const { isAvailable } = data;
  const businessModel = await getBusinessRegistrationModelbyID(businessID);
  if (businessModel === false) {
    return false;
  }

  if (isAvailable == true) {
    await BusinessRegistration.update(
      {
        isAvailable: true,
      },
      {
        where: {
          id: businessModel.id,
        },
      }
    );
    const context = {
      data: "Name is available ",
      statis: false,
    };
    return context;
  } else {
    const context = {
      data: "Name is already Taken",
      statis: false,
    };
    return context;
  }
};

module.exports = {
  getAllBusinessRegistered,
  getBusinessRegistrationFieldByID,
  changePayementStatus,
  uploadBusinessRegFile,
  changeBusinessNameStatus,
};
