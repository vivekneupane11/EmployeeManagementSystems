import express from "express";
const app = express.Router();
import bodyParser from "body-parser";
import cors from "cors";
//Local Routes
import userroute from "../users/routes/users.routes";
import departmentroutes from "../departments/routes/department.routes";
import imageuploadroute from "../imageUploader/routes/imageupload.routes";
import documentuploadroute from "../documentUploader/routes/documentupload.routes";
import searchbar from '../searchbar';

app.use(bodyParser.json());
app.use(cors());

app.use(userroute);
app.use(departmentroutes);
app.use(imageuploadroute);
app.use(documentuploadroute);
app.use(searchbar);
app.use("/", (req, res) => {
  res.status(400).send("The page you are looking for is not found !!");
});

module.exports = app;
