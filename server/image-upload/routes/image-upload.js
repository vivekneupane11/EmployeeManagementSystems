const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const upload = require("../image-upload");

const singleUpload = upload.single("image");
router.post("/images", async function(req, res) {
  // const ID= await mongodb.ObjectID();

  const data = await req.db.collection("images").findOne({
    email: req.body.email
  });

  return res.json({ data: data });
});
router.post("/image-upload", function(req, res) {
  singleUpload(req, res, async function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }
    console.log(req.body.email + req.file.location);
    const user = await req.db.collection("images").findOne({
      email: req.body.email
    });

    if (user) {
      const myquery = { email: user.email };
      const newvalues = {
        $set: {
          email: req.body.email,
          image: req.file.location,
          createdat: Date.now()
        }
      };
      await req.db.collection("images").updateOne(myquery, newvalues);
    } else {
      await req.db.collection("images").insertOne({
        email: req.body.email,
        image: req.file.location,
        createdat: Date.now()
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});
module.exports = router;
