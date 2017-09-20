"use strict";
var express = require("express");
var app = express();
var JsonParser = require("body-parser").json;
var shoeRec = require("./routes");
// var data=require("./data");

var logger = require("morgan");
app.use(logger("dev"));



app.use(JsonParser());



app.get('/api/shoes', function(req, res) {
  var shoes = req.params.shoes;
  shoeRec.keepData.find({}, function(err, shoeCase) {
    if (err) {
      console.log(err);
    } else {
      shoeRec.keepData.create({

        color: shoes,
        brand: shoes,
        price: shoes,
        size: shoes,
        in_stock: shoes
      }, function(err, results) {
        if (err) {
          console.log(err);
        } else {

          res.json({
            
    color:results,
    brand:results,
    price:results,
    size:results,
    in_stock:results


          })
        }
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
    } else if (sizeWthbrand) {
      res.json({
        size: 7,
        brand: 'puma'
      })
    }
  })
})

app.post('/api/shoes/sold/:id', function(req, res) {

  shoeRec.keepData.findOneAndUpdate({
    id: id
  }, {
    in_stock: in_stock - 1
  }, function(err, shoeUpdate) {
    if (err) {
      console.log(err);
    } else {
      if (!shoeUpdate) {
        var newShoe = new shoeRec.keepData({
          id: id
        })
        newShoe.save(function(err, results) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              id: id
            })
          }
        })
      }


    }

  })
})


app.post('/api/shoes', function(req, res) {
var shoes=req.body
  shoeRec.keepData.findOne({}, function(err, shoeCase) {
    if (err) {
      console.log(err);
    } else {
      shoeRec.keepData.create({

        color: shoes.color,
        brand: shoes.brand,
        price: shoes.price,
        size: shoes.size,
        in_stock: shoes.in_stock
      }, function(err, results) {
        if (err) {
          console.log(err);
        } else {

          res.send(results)
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
