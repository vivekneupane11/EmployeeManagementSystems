const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path=require('path');

aws.config.update({
  secretAccessKey: 'RpbPDKpxz6I0+qs3CpN2vNtex0xjt34e66MHR/B0',
  accessKeyId: 'AKIA4QAQQ22KUYDNC47V',
  region: 'us-west-2',
  encryption:'AES-256'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    let fileExtension=path.extname(file.originalname);
  if (req.originalUrl=='/document-upload' && fileExtension == '.pdf') {
      cb(null, true)
  } else {
      cb(new Error('Invalid , only pdf'), false);
  }
}

const upload = multer({
  fileFilter,
  
  storage: multerS3({
    s3,
    bucket: 'stage-bitsbeat-s3',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
      console.log(Date.now().toString())
    }
  })
})

module.exports = upload;