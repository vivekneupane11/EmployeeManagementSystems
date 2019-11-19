import express from "express";
import adaptRequest from "../../globalHelpers/adapt-request";
import imageuploadhandler from "../../imageUploader";
import upload from "../../globalHelpers/aws.heper";
const imageuploadroute = express.Router();

const singleUpload = upload.single("image");

imageuploadroute.post("/image-upload", imageuploadController);

async function imageuploadController(req, res) {
  await singleUpload(req, res, async function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }
    const imagePath = req.file.location;
    const httpMethods = adaptRequest(req);
    imageuploadhandler({ imagePath, httpMethods })
      .then(({ statusCode, headers, data }) => {
        res
          .set(headers)
          .status(statusCode)
          .send(JSON.stringify(data));
      })
      .catch(error => {
        res
          .set({ "Content-Type": "application/json" })
          .status(500)
          .send(JSON.stringify(error));
      });
  });
}

module.exports = imageuploadroute;
