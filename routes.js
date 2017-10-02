var express = require("express");
var router = express.Router();




var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/API_SHOE";

mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log('error connection');
  } else {
    console.log('database connection success');
  }
});


exports.keepData = mongoose.model('keepData', {

  brand: String,
  color: String,
  price: Number,
  size: Number,
  in_stock: Number
});


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // /Get /questions
// // route for questions collections
// router.get("/:api/shoes",function(req,res){
// res.json({response:"You sent me a Get request",
//               shoeID:req.params.api
//           })
// });
//
//
//
//
// // /Post /questions
// // route for creating  questions
// router.post("/",function(req,res){
// res.json({
//   response:"You sent me a Post request",
//   body:req.body
// });
//
//
// // route for specific questions
// // /Get /questions/:id
//
// router.get("/:qID",function(req,res){
// res.json({
//   response:"You sent me a Get request for ID"+req.params.qID});
// });
//
// });
//
//
// // /Post /questions/:id/answers
// // route for creating  an answer
// router.post("/:qID/answers",function(req,res){
// res.json({
//   response:"You sent me a Post request to /answers",
//   questionID: req.params.qID,
//   body:req.body
// })
// });
//
//
//
// // /Put /questions/:id/answers/:id
// // edit a specific answer
// router.put("/:qID/answers/:aID",function(req,res){
// res.json({
//   response:"You sent me a Put request to /answers",
//   questionID: req.params.qID,
//   answerID:req.params.aID,
//   body:req.body
// })
//
// });
//
//
//
// // /Delete /questions/:id/answers/:id
// // delete a specific answer
// router.delete("/:qID/answers/:aID",function(req,res){
// res.json({
//   response:"You sent me a Delete request to /answers",
//   questionID: req.params.qID,
//   answerID:req.params.aID
//
// })
//
// });
//
//
//
//
//
//
// // /Post /questions/:id/answers/:id/vote-up
// // /Post /questions/:id/answers/:id/vote-down
//
// // vote on a specific answer
// router.post("/:qID/answers/:aID/vote-up:dir",function(req,res){
// res.json({
//   response:"You sent me a Post request to /vote-"+reg.params.dir,
//   questionID: req.params.qID,
//   answerID:req.params.aID,
//   vote:req.params.dir
//
// })
//
// });
//
//
//
//
//
// // /Get/questions/5/answers
// router.get("/5/answers");
//
// module.exports=router;
