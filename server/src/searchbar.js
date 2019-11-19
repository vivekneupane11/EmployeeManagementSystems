const express = require("express");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
import makeDb from "./db";

router.post("/searchdept", async (req, res, next) => {
  try {
    let query2 = {
      departmentName: new RegExp(req.body.search),
      deleted: false
    };
    const db = await makeDb();
    await db
      .collection("department")
      .find(query2)
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
  } catch (error) {
    res.send("hellloagain" + error);
  }
});

router.post("/searchuser", async (req, res, next) => {
  try {
    let query1 = { username: new RegExp(req.body.searchname), deleted: false };
    const db = await makeDb();
    await db
      .collection("users")
      .find(query1)
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
  } catch (error) {
    res.send("hello" + error);
  }
});

module.exports = router;
