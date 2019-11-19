const express= require('express');
const router=express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/search',async (req,res,next)=>{
try{
    
    let query1= { name: req.query.search };
    
    await req.db.collection("users").find(query1).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
     
      });}
      catch(error){
          res.send("hello"+error)
      }

      try{
        let query2= { name: req.query.search };  
   await req.db.collection("department").find(query2).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
     
      });} catch(error){
          res.send("hellloagain"+error)
      }
});
module.exports=router;
