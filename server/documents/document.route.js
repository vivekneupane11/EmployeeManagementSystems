const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoClient = require("mongodb").MongoClient;

//Setting up our storage

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("destination::" + file);
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    }
});
//uploading file and filtering for pdf only
let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        let fileExtension = path.extname(file.originalname);
        if (req.originalUrl == '/uploadfile' && fileExtension !== ".pdf") {
            const error = new Error("Only pdf format supported !!!");
            error.statusCode = 405;
            return cb(error, false);
        }
        if (req.originalUrl == '/uploadimage' && fileExtension !== (".jpg" || ".png" || ".jpeg")) {
            const error = new Error("Only pdf format supported !!!");
            error.statusCode = 405;
            return cb(error, false);
        }
        cb(null, true);
    }
});
router.get("/getdocuments", async(req, res) => {
    try {
        const DOCUMENTS = req.db.collection("documents");
        await DOCUMENTS.find({}).toArray(function(error, result) {
            if (error) {
                error.statusCode = 500; //internal server error
                next(error);
            }
            res.status(200).json({
                status: 200,
                message: {
                    error: null,
                    data: result,
                    success: true
                }
            });
        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }
});
router.post("/uploadfile", upload.single("myFile"), async(req, res, next) => {

    try {
        const DOCUMENTS = req.db.collection("documents");
        const file = req.file;
        if (!file) {
            const error = new Error("Please upload a file");
            error.statusCode = 400;
            return res.status(400).json({
                message: "File Not-allowed " + error,
                suggest: "Only .pdf file supported ",
                success: false
            });
        }

        console.log(req.file.filename);
        console.log(req.body);

        await DOCUMENTS.insertOne({
            filename: req.file.filename,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            visibility: req.body.visibility
        });
        res.status(200).json({
            status: 200,
            details: {
                error: null,
                success: true,
                message: "File uploaded succesfully !!"
            }
        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }
});

router.post("/uploadimage", upload.single("myImage"), async(req, res, next) => {
    try {
        const DOCUMENTS = req.db.collection("documents");
        const file = req.file;
        if (!file) {
            const error = new Error("Please upload a file");
            error.statusCode = 400;
            return res.status(400).json({
                message: "File Not-allowed " + error,
                suggest: "Only .jpg/.jpeg/.png file supported ",
                success: false
            });
        }

        res.status(200).json({
            status: 200,
            details: {
                error: null,
                success: true,
                message: "File uploaded succesfully !!"
            }
        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }
});

module.exports = router;