import express from "express";
import adaptRequest from "../../globalHelpers/adapt-request";
import documentuploadhandler from "../../documentUploader";
import upload from "../../globalHelpers/aws.heper";
const documentuploadroute = express.Router();

const singleUpload = upload.single("document");

documentuploadroute.all("/documents", documentuploadController);
documentuploadroute.get("/documents/:id", documentuploadController);

async function documentuploadController(req, res) {
  if (req.method == "POST") {
    console.log("here");
    await singleUpload(req, res, async function(err) {
      if (err) {
        return res.status(422).send({
          errors: [
            { success: false, title: "File Upload Error", detail: err.message }
          ]
        });
      }
      const documentPath = req.file.location;
      const httpMethods = adaptRequest(req);
      documentuploadhandler({ documentPath, httpMethods })
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
  } else if (req.method == "GET") {
    const httpMethods = adaptRequest(req);
    documentuploadhandler({ httpMethods })
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
  }
}

module.exports = documentuploadroute;
