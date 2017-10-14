var ShoeTemplate = document.getElementById('ShoeTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(ShoeTemplate);

var brandTemplate=document.getElementById('brandTemplate').innerHTML;
var brandTempInstance=Handlebars.compile(brandTemplate);

var sizeTemplate=document.getElementById('sizeTemplate').innerHTML;
var sizeTempInstance=Handlebars.compile(sizeTemplate);

var brandTemplate=document.querySelector('.brandTemplate');
var shoeDisplay = document.getElementById('shoeDisplay');
var addingStock = document.getElementById('addingStock');
var addStockBtn = document.getElementById("addStock");
var brandInput = document.getElementById('shoe-brand').value;
var Container=document.getElementById('.Container');
// var selectBrand = document.querySelector('#brandDrpDwn');
var allShoes = [];
var allShoeObj = {};



// displays all the shoes & get rid of duplicates in size and brand
function getAllShoe() {
  var shoeDisplay = document.getElementById('shoeDisplay');

  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(data) {

      var brandMap = [];

      data.shoeCase.forEach(function(currBrand) {
        if (brandMap.indexOf(currBrand.brand) == -1) {
          brandMap.push(currBrand.brand);
        }
      });

      var sizeMap = [];
      data.shoeCase.forEach(function(currSize) {
        if (sizeMap.indexOf(currSize.size) == -1) {
          sizeMap.push(currSize.size);
        }
      })
      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase,
        brandMap: brandMap.sort(),
        sizeMap: sizeMap.sort()
      })
//     var dropTemp=dropTempInstance({
//
// })
      shoeDisplay.innerHTML = shoesHtml;

      allShoes = data.shoeCase;

    }
    // error: function(error) {
    //   alert('error found : ' + error);
    //
    //
    // },

  })
}
getAllShoe();


var addButton = document.querySelector('#addStock');
addStockBtn.addEventListener('click', function() {

  var brandInput = document.getElementById('shoe-brand').value;
  var colorInput = document.getElementById('shoe-color').value;
  var sizeInput = document.getElementById('shoe-size').value;
  var priceInput = document.getElementById('shoe-price').value;
  var in_stockInput = document.getElementById('in_stock').value;

  var shoeDisplay = document.getElementById('shoeDisplay');

  var shoeCarrier = {
    brand: brandInput,
    color: colorInput,
    size: sizeInput,
    price: priceInput,
    in_stock: in_stockInput
  }

  console.log(shoeCarrier);

  $.ajax({
    url: '/api/shoes',
    type: 'POST',
    data: shoeCarrier,
    dataType: 'json',
    success: function(postAShoe) {

      console.log('Succefully added the shoe' + postAShoe);


    }
    // error: function(error) {
    //   console.log(error);
    //
    //
    // }
  })
  getAllShoe();
})



var brandDisplay=document.getElementById('brandDisplay');
var sizeDisplay=document.getElementById('sizeDisplay');
// populating brand dropdown
function displayDrop(){
  $.ajax({
    url:'/api/shoes/brands',
    success: function(results) {
      var tempBrand = brandTempInstance({
        //shoes:results,
        brandMap:results.brand
      })
      brandDisplay.innerHTML = tempBrand;
    }
  })
}
displayDrop();

// populating size dropdown
function displaySizeDrp(){
  $.ajax({
    url:'/api/shoes/sizes',
    success: function(result) {
      var tempSize = sizeTempInstance({
        //shoes:results,
        sizeMap:result.size
      })
      sizeDisplay.innerHTML = tempSize;
    }
  })
}
displaySizeDrp();




// filter by size


function filterbyBrand() {
var divDrop=document.querySelector('.col-sm-4');
var brandTemplate=document.querySelector('#brandTemplate');
var selectBrand = document.getElementById('brandDrpDwn').value;
console.log(selectBrand);
var brandOpt=document.getElementById('brandOpt').value;



  $.ajax({
    url:'/api/shoes/brand/'+selectBrand,
    type: 'GET',
    dataType: 'json',
    data:'brand',
    success: function(reslts) {
      alert('dfghb')
      console.log('*********',reslts)
      var tableTemp=myTemplateInstance({
        shoes:reslts.brand
        // brandMap:reslts

      })
      console.log(reslts);
      shoeDisplay.innerHTML=tableTemp;
    }

  })


}
















function filterbySize() {

var Selectsize=document.getElementById('sizeDrpDwn').value;
console.log(Selectsize);
  $.ajax({
    url:'/api/shoes/size/'+Selectsize,
    type: 'GET',
    dataType: 'json',
    data:'size',
    success: function(product) {
      alert('dfghb')
      console.log('*********',product)
      var table=myTemplateInstance({
        shoes:product.size
        // brandMap:reslts

      })
      console.log(product);
      shoeDisplay.innerHTML=table;
    }

  })


}

























//
//
// function filterbyBrand() {
//
// var divDrop=document.querySelector('.col-sm-4')
// if(selectBrand!=="" ){
//   console.log('*****',selectBrand);
//   $.ajax({
//     url: "/api/shoes/brand",
//
//     type: 'GET',
//     dataType: 'json',
//     success: function(results) {
//       console.log('*********',results.shoeBox);
//       var brandTemp=myTemplateInstance({
//         brandMap:results.shoeBox
//       })
//       shoeDisplay.innerHTML=brandTemp;
//     }
//
//   })
// }
// }

//
//
//
// function filterSize(size) {
//
//   // var sizeDrpDwn = document.querySelector('#sizeDrpDwn');
//   // var searDrop = document.querySelector('#sizeDrpDwn');
//   // console.log(searDrop);
//   // var shoeDisplay = document.getElementById('shoeDisplay');
//   // var sizeTemplate = document.querySelector('.sizeTemplate');
//   // var sizeOpt = document.getElementById('sizeOpt');
//   //
//   // var size = {
//   //   size: sizeDrpDwn.options[sizeDrpDwn.selectedIndex].text
//   // }
//   // console.log('******',sizes);
//   //
//   $.ajax({
//     url: " /api/shoes/size/" + size,
//     type: 'GET',
//     data: size,
//     dataType: 'json',
//     success: function(sizeParam) {
//
//
//       var tempSize = dropTempInstance({
//         // shoes: sizeParam.size,
//        sizeMap:sizeParam
//       })
//       dropDisplay.innerHTML = tempSize;
//     }
//   })
// }
// filterSize(6);

// function filterBoth() {
//   var sizeDrpDwn = document.querySelector('#sizeDrpDwn');
//   var selectBrand = document.querySelector('#brandDrpDwn');
//   // alert('sssssssssssssss')
//   // // alert('ghjkl')
//   // var filter = document.querySelector('.filter');
//   // var sizeDrpDwn = document.querySelector('#sizeDrpDwn');
//   // console.log('@@@@', sizeDrpDwn);
//   // var selectBrand = document.querySelector('#brandDrpDwn');
//   // console.log('@@@', selectBrand);
//   // var size = {
//   //   size: sizeDrpDwn.options[sizeDrpDwn.selectedIndex].text
//   // }
// if(selectBrand!=="" && sizeDrpDwn!=="" ){
// console.log(selectBrand);
//   $.ajax({
//       url: '/api/shoes/brand/size/' + brand.brand+"/"+size.size,
//       type: 'GET',
//       success: function(reslt) {
//
// console.log(reslt);
//           var tempSizeAndBrand = myTemplateInstance({
//             brandMap: reslt.brand,
//             sizeMap: reslt.size
//           })
//           shoeDisplay.innerHTML = tempSizeAndBrand;
//         }
//
//
//       })
//
//
//   }
// }
// filterBoth();






  // buy shoe function
  function purchaseShoe(id) {


    var buyDisplay = document.querySelector('#buyDisplay');
    console.log(buyDisplay);
    var shoeDisplay = document.getElementById('shoeDisplay');

    $.ajax({
      url: '/api/shoes/sold/' + id,
      type: 'POST',
      success: function(thenga) {

        window.location.reload();
        allShoes.forEach(function(shoe) {
          if (shoe._id == thenga.data._id) {
            shoe.in_stock = thenga.data.in_stock;
          }
        })
        var buyShoe = myTemplateInstance({
          shoes: allShoes
        })
        shoeDisplay.innerHTML = buyShoe;
      }
    })
  }

  // filtering by both size and brand
