const express = require("express");
const router = express.Router();
const upload = require("../documentupload");
const singleUpload = upload.single("myFile");
router.get("/get-org_documents", async function(req, res) {
  // const ID= await mongodb.ObjectID();
  const data = await req.db
    .collection("newdocument")
    .find({
      doc_type: "organization"
    })
    .toArray();

  return res.json({ data: data });
});
router.post("/get-ind_documents", async function(req, res) {
  // const ID= await mongodb.ObjectID();
  console.log(req);
  console.log("heool");

  const data = await req.db
    .collection("newdocument")
    .find({
      doc_type: "individual",
      email: req.body.email
    })
    .toArray();

  return res.json({ data: data });
});
router.post("/document-upload", function(req, res) {
  singleUpload(req, res, async function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }
    console.log(req.body.title + req.file.location);

    await req.db.collection("newdocument").insertOne({
      title: req.body.title,
      description: req.body.description,
      visibility: req.body.visibility,
      author: req.body.author,
      myFile: req.file.location,
      doc_type: req.body.doc_type,
      email: req.body.email,

      created_at: Date.now()
    });

    return res.json({ documentUrl: req.file.location });
  });
});
module.exports = router;
