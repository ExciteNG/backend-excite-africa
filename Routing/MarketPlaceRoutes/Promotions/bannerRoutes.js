const express = require("express");
const pool = require('./temporaryDB.js');

const router = express.Router();

// const bannerPost = (req, res) => {
router.post("/new", (req, res) => {
  console.log('inside post..');
  const { category, purpose, banner, approvedStatus } = req.body;
  const data  = {
      category: category,
      purpose: purpose,
      banner: banner,
      approvedStatus: approvedStatus,
      dateCreated: Date.now()
    };

  pool.connect(() => {
    // done();
    const query = 'INSERT INTO banners(category, purpose, banner, approvedStatus, dateCreated) VALUES($1, $2, $3, $4, $5)';
    const values = [
      data.category, data.purpose, data.banner, data.banner, data.approvedStatus, data.dateCreated
    ];
    pool.query(query, values, (error) => {
      if (error) throw error;
      res.status(200).json({
        status: 'success',
        info: data,
      });
    });
  });
  // pool.end();
  // next();
});

router.put("/update", (req, res) => {
  console.log('inside update', req.param.id);
  const data = {
    // id: req.body.id,
    category: req.body.category,
    purpose: req.body.purpose,
    banner: req.body.banner,
    approvedStatus: req.body.approvedStatus,
    dateCreated: req.body.dateCreated,
  };

  pool.connect(() => {
    // done();
    const query = 'UPDATE banners SET category=$1, purpose=$2, banner=$3, approvedStatus=$4, dateCreated=$5 WHERE id=$6';
    const values = [
      data.category, data.purpose, data.banner, data.approvedStatus, data.dateCreated,
      req.params.id,
    ];
    pool.query(query, values, (error) => {
      if (error) throw error;
      res.status(201).json({
        status: 'success',
        message: 'banner successfully updated',
        info: data,
      });
    });
  });
  // pool.end();
  // next();
});

router.get("/all", (req, res) => {
  res.send("data workimg!");
  // pool.connect(() => {
  //   // if (err) throw err;
  //   const query = 'SELECT * FROM banners';
  //   pool.query(query, (error, result) => {
  //     if (error) throw error;
  //     if (!result) {
  //       res.status(404).json({
  //         status: 'Failed',
  //         message: 'No banner found',
  //       });
  //     }
  //     res.status(200).json({
  //       status: 'Success',
  //       banners: result.rows,
  //     });
  //   });
  // });
  // pool.end();
});

router.delete("/delete", (req, res) => {
  const { id } = req.params;
  pool.connect(() => {
    // if (err) throw err;
    const query = 'DELETE FROM banners WHERE id = $1';
    pool.query(query, [id], (error) => {
      if (error) throw error;
      res.status(200).json({
        status: 'success',
        message: 'Program successfully deleted',
      });
      // if (!err) {
      //   res.status(200).json({
      //     status: 'success',
      //     message: 'Program successfully deleted',
      //   });
      // } else {
      //   res.status(400).json({ error });
      // }
    });
  });
  // next();
});

module.exports = router;

// module.exports = {
//   bannerPost,
//   bannerPatch,
//   bannersGet,
//   bannerDelete,
// };


// const router =
// // const router = express.Router();
//
// // Post tax
// router.post("/new", async (req, res) => {
//   const { category, purpose, banner, approvedStatus } = req.body;
//   const bannerAdd = {
//     Category: category,
//     Purpose: purpose,
//     banner: banner,
//     ApprovedStatus: approvedStatus,
//     dateCreated: Date.now()
//   }
//   // handle post to database here
//   await res.status(200).json({
//     message: "POST route working!",
//     info: bannerAdd
//     });
// });
//
// router.get("/all", async (req, res) => {
//   // handle fetch all tax records from database here.
//   await res.status(200).json({ message: "GET route working!"})
// });
//
// module.exports = router;
//
