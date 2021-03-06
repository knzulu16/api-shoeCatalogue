"use strict";
var express = require("express");
var app = express();
var JsonParser = require("body-parser");
var shoeRec = require("./models");
var ObjectId = require('mongodb').ObjectId;

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
app.use(JsonParser.urlencoded({
  extended: true
}));


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
    } else {
      res.json({
        size: results
      })
    }
  })
})


// getting all the brands

app.get('/api/shoes/sizes', function(req, res) {
  shoeRec.keepData.find({}, function(err, allSizes) {
   if (err) {
      console.log(err);
    } else {
      res.json({

        size:allSizes.sort("1-12")
      })
    }
  })
})


app.get('/api/shoes/brands', function(req, res) {
  shoeRec.keepData.find({}, function(err, allBrands) {

   if (err) {
      console.log(err);
    } else {
      res.json({
        brand:allBrands.sort("A-Z")
      })
    }
  })
})


// getting all the sizes
// app.get('/api/shoes/size', function(req, res) {
//   shoeRec.keepData.find({}, function(err, allSizes) {
//     var sizes=[];
//     var sizeMap={};
//     for(var i=0;i<allSizes.length;i++){
//       if(sizeMap[allSizes[i]]==undefined){
//         sizeMap[allSizes[i].size]=allSizes[i].size;
//
//         sizes.push(allSizes[i].size);
//
//       }
// }
//   if (err){
//       console.log(err);
//     }else {
//       res.json({
//         sizes:sizes.sort()
//       })
//     }
//   })
// })

// app.get('/api/shoes/color', function(req, res) {
//   shoeRec.keepData.find({}, function(err, allColors) {
//     var colors=[];
//     var colorMap={};
//     for(var i=0;i<allColors.length;i++){
//       if(colorMap[allColors[i]]==undefined){
//         colorMap[allColors[i].colors]=allColors[i].colors;
//
//         colors.push(allColors[i].colors);
//
//       }
// }
//   if (err){
//       console.log(err);
//     }else {
//       res.json({
//         colors:colors.sort()
//       })
//     }
//   })
// })






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
    upsert: false,
    new: true

  }, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({
        status: "error",
        error: err,
        data: []
      })
    }
      if(results.in_stock < 1 ) {
        console.log('results', results.in_stock);
        results.remove();

        res.json({
          status: "removed",
        })
      }
      else {

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
  var shoes = req.body;
  var brand = shoes.brand;
  var color = shoes.color;
  var price = shoes.price;
  var size = shoes.size;
  var in_stock = shoes.in_stock;

  shoeRec.keepData.findOneAndUpdate({
    brand: brand,
    color: color,
    price: price,
    size: size,
  }, {
    $inc: {
      in_stock: in_stock

    }
  }, function(err, shoeCase) {
    if (err) {
      console.log(err);
    } else if (!shoeCase) {
      shoeRec.keepData.create({
        brand: brand,
        color: color,
        price: price,
        size: size,
        in_stock: in_stock
      }, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.json({
      results: shoeCase

    });
  });
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
