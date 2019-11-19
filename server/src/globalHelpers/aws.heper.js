import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
  secretAccessKey: "RpbPDKpxz6I0+qs3CpN2vNtex0xjt34e66MHR/B0",
  accessKeyId: "AKIA4QAQQ22KUYDNC47V",
  region: "us-west-2",
  encryption: "AES-256"
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
  if (req.path == "/image-upload") {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
    }
  } else if (req.path == "/documents") {
    console.log(file.mimetype);
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Cannot Upload!!Only Pdf supported "), false);
    }
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "stage-bitsbeat-s3",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
      console.log(Date.now().toString());
    }
  })
});
module.exports = upload;
