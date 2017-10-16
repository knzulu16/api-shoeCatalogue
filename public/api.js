var ShoeTemplate = document.getElementById('ShoeTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(ShoeTemplate);

var brandTemplate = document.getElementById('brandTemplate').innerHTML;
var brandTempInstance = Handlebars.compile(brandTemplate);

var sizeTemplate = document.getElementById('sizeTemplate').innerHTML;
var sizeTempInstance = Handlebars.compile(sizeTemplate);

var brandTemplate = document.querySelector('.brandTemplate');
var shoeDisplay = document.getElementById('shoeDisplay');
var addingStock = document.getElementById('addingStock');
var addStockBtn = document.getElementById("addStock");
var brandInput = document.getElementById('shoe-brand').value;
var Container = document.getElementById('.Container');

var allShoes = [];
var allShoeObj = {};



// displays all the shoes & get rid of duplicates in size and brand
var brandMap = [];
var sizeMap = [];

function getAllShoe() {
  var shoeDisplay = document.getElementById('shoeDisplay');
  console.log("in getAllShoe");
  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(data) {
      console.log(data.shoeCase);
      data.shoeCase.forEach(function(currentShoe) {
        if (brandMap.indexOf(currentShoe.brand) == -1) brandMap.push(currentShoe.brand);
        if (sizeMap.indexOf(currentShoe.size) == -1) sizeMap.push(currentShoe.size);
      });
      document.querySelector('#brandDrpDwn').innerHTML += brandTempInstance({
        brandMap: brandMap
      });
      document.querySelector('#sizeDrpDwn').innerHTML += sizeTempInstance({
        sizeMap: sizeMap
      });


      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase,
        brandMap,
        sizeMap
      })

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



var brandDisplay = document.getElementById('brandDisplay');
var sizeDisplay = document.getElementById('sizeDisplay');
// populating brand dropdown
// function displayDrop() {
//   $.ajax({
//     url: '/api/shoes/brands',
//     success: function(results) {
//       console.log(results.brand);
//       var tempBrand = brandTempInstance({
//         //shoes:results,
//         // brandMap:results.brand
//
//
//
//
//
//       })
//       brandDisplay.innerHTML = tempBrand;
//     }
//   })
// }
// displayDrop();

// populating size dropdown
// function displaySizeDrp() {
//   $.ajax({
//     url: '/api/shoes/sizes',
//     success: function(result) {
//       console.log(result.sizeMap);
//       // var tempSize = sizeTempInstance({
//       //   //shoes:results,
//       //   sizeMap: result.size
//       //
//       // })
//       sizeDisplay.innerHTML = tempSize;
//     }
//   })
// }
// displaySizeDrp();
//



// filter by size


function filterbyBrand() {
  console.log("Ochange");
  var divDrop = document.querySelector('.col-sm-4');
  var brandTemplate = document.querySelector('#brandTemplate');
  var selectBrand = document.getElementById('brandDrpDwn').value;
  console.log(selectBrand);

  $.ajax({
    url: '/api/shoes/brand/' + selectBrand,
    type: 'GET',

    success: function(reslts) {
      alert('dfghb')
      console.log('*********', reslts)
      var tableTemp = myTemplateInstance({

        shoes: reslts.brand

      })
      console.log(reslts);
      shoeDisplay.innerHTML = tableTemp;
    }

  })


}





function filterbySize() {

  var Selectsize = document.getElementById('sizeDrpDwn').value;
  console.log(Selectsize);
  $.ajax({
    url: '/api/shoes/size/' + Selectsize,
    type: 'GET',
    dataType: 'json',
    data: 'size',
    success: function(product) {
      alert('dfghb')

      var table = myTemplateInstance({
        shoes: product.size

      })

      shoeDisplay.innerHTML = table;
    }

  })


}









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
