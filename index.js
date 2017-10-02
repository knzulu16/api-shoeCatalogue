"use strict";
var express = require("express");
var app = express();
var JsonParser = require("body-parser");
var shoeRec = require("./routes");
var ObjectId = require('mongodb').ObjectId;
// var data=require("./data");
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
  next();
})

var logger = require("morgan");
app.use(logger("dev"));



app.use(JsonParser.json());
app.use(JsonParser.urlencoded({extended: true}));


app.get('/api/shoes', function(req, res) {
  shoeRec.keepData.find({}, function(err, shoeCase) {
    if (err) {
      console.log(err);
    } else {

      res.json({
        shoeCase

      })
    }
  })
});






app.get('/api/shoes/brand/:brandname', function(req, res) {
  var brandname = req.params.brandname;

  shoeRec.keepData.find({
    brand: brandname
  }, function(err, shoeBox) {
    console.log();
    if (err) {
      console.log(err);
    } else {
      res.json({
        brand: shoeBox
      })
    }
  })
})


app.get('/api/shoes/size/:size', function(req, res) {
  var size = req.params.size;
  shoeRec.keepData.find({
    size: size
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else if (results) {
      res.json({
        size: results
      })
    }
  })
})


app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
  var size = req.params.size;
  var brandname = req.params.brandname;
  shoeRec.keepData.find({
    size: size,
    brand: brandname
  }, function(err, sizeWthbrand) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        size: sizeWthbrand,
        brand: sizeWthbrand
      })
    }
  })
})

app.post('/api/shoes/sold/:id', function(req, res) {
  console.log(req.body.id);
  var id = req.params.id;
  shoeRec.keepData.findOneAndUpdate({
    _id: ObjectId(id)
  }, {
    $inc: {
      "in_stock": -1
    }
  }, {
    upsert: false

  }, function(err, results) {
    if (err) {
      console.log(err);

      // else  if (!results) {
      // var newShoe = new shoeRec.keepData({
      //   _id: ObjectId(id)
      // },{
      //   $inc:{
      //     "in_stock":1
      //   }
      // })
      // newShoe.save(function(err, results) {
      return res.json({
        status: "error",
        error: err,
        data: []
      })
    } else {
      //  in_stock:results

      res.json({
        status: "success",
        data: results
      })

    }
  })
})





// , function(err, shoeUpdate) {
//   if (err) {
//     console.log(err);
//   }
// } else {
//   if (!shoeUpdate) {
//     var newShoe = new shoeRec.keepData({
//       id: id
//     })
//     newShoe.save(function(err, results) {
//       if (err) {
//         console.log(err);
//       } else {
//        res.json({
//          in_stock:results
//        })
//      }
//    })



//})





app.post('/api/shoes', function(req, res) {
  var shoes = req.body

  shoeRec.keepData.findOne({

    brand: shoes.brand,
    color: shoes.color,
    price: shoes.price,
    size: shoes.size,
    in_stock: shoes.in_stock
  }, function(err, shoeCase) {
    if (err) {
      console.log(err);
    } else {
      shoeRec.keepData.create({

        brand: shoes.brand,
        color: shoes.color,
        price: shoes.price,
        size: shoes.size,
        in_stock: shoes.in_stock
      }, function(err, results) {
        if (err) {
          console.log(err);

        } else {

          res.send({
            data: results,
            status: 200
          })
        }
      })
    }

  })

});









// var jsonCheck=function(req,res,next){
//   if(req.body){
//   console.log("The sky is", req.query.color);
// }else{
//   console.log("There is no body property on the request");
// }
//   next();
//
// }
// app.use(jsonCheck);
// app.use(jsonCheck);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Express server is listening on port", port);
});
