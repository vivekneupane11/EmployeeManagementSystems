const express = require("express");
const router = express.Router();
const app = express();

//local packages
const crudController = require("./department.controller");
router.get("/deptgetdata", (req, res, next) => {
  crudController.getallDepartment(req, res, next);
});
router.post("/department", (req, res, next) => {
  crudController.createDepartment(req, res, next);
});
router.delete("/department/:id", (req, res, next) => {
  crudController.deleteDepartment(req, res, next);
});

router.put("/department/:id", (req, res, next) => {
  crudController.updateDepartment(req, res, next);
});

module.exports = router;
