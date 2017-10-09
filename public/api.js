var ShoeTemplate = document.getElementById('ShoeTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(ShoeTemplate);
var shoeDisplay = document.getElementById('shoeDisplay');
var addingStock = document.getElementById('addingStock');
var addStockBtn = document.getElementById("addStock");
var brandInput = document.getElementById('shoe-brand').value;
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


function filter() {


  var brandTemplate = document.querySelector('.brandTemplate');
  var shoeDisplay = document.getElementById('shoeDisplay');
  var selectBrand = document.querySelector('#brandDrpDwn')
  var colorFilter = document.querySelector('#colorDrpDwn');
  var sizeFilter = document.querySelector('#sizeDrpDwn');
  var priceFilter = document.querySelector('#priceDrDwn');
  var brandOpt = document.getElementById('brandOpt');
  var filter = document.querySelector('.filter');

  var brand = {
    brand: selectBrand.options[selectBrand.selectedIndex].text
  }



  $.ajax({
    url: " /api/shoes/brand/" + brand.brand,

    type: 'GET',
    data: brand,
    dataType: 'json',
    success: function(results) {

      var tempBrand = myTemplateInstance({
        shoes: results.brand,

      })

      shoeDisplay.innerHTML = tempBrand
    }

  })
}


// filtering by size
function filterSize() {

  var searDrop = document.querySelector('#sizeDrpDwn');
  console.log(searDrop);
  var shoeDisplay = document.getElementById('shoeDisplay');
  var sizeDrpDwn = document.querySelector('#sizeDrpDwn');
  var sizeTemplate = document.querySelector('.sizeTemplate');
  var sizeOpt = document.getElementById('sizeOpt');

  var size = {
    size: sizeDrpDwn.options[sizeDrpDwn.selectedIndex].text
  }

  $.ajax({
    url: " /api/shoes/size/" + size.size,
    type: 'GET',
    data: size,
    dataType: 'json',
    success: function(sizeParam) {

      var tempSize = myTemplateInstance({
        shoes: sizeParam.size
      })
      shoeDisplay.innerHTML = tempSize;
    }
  })
}

function filterBoth() {
  // alert('sssssssssssssss')

  alert('ghjkl')
  var filter = document.querySelector('.filter');
  var sizeDrpDwn = document.querySelector('#sizeDrpDwn').value;
  console.log('@@@@', sizeDrpDwn);
  var selectBrand = document.querySelector('#brandDrpDwn').value;
  console.log('@@@', selectBrand);


  console.log('takeBoth', takeBoth);
  $.ajax({
      url: '/api/shoes/brand/size/' + brand.brand+size.size,
      type: 'GET',
      success: function(reslt) {
        console.log('@@@@@@@@',reslt);
        var filterList=[];
        reslt.shoeCase.forEach(function(data){
          if(selectBrand.data==sizeDrpDwn.data){
            filterList.push(data);
          }
        })

          var tempSizeAndBrand = myTemplateInstance({
            brandMap: filterList.brand,
            sizeMap: filterList.size
          })
          shoeDisplay.innerHTML = tempSizeAndBrand;
        }


      })


  }
filterBoth();






  // buy shoe function
  function purchaseShoe(id) {


    var buyDisplay = document.querySelector('#buyDisplay');
    console.log(buyDisplay);
    var shoeDisplay = document.getElementById('shoeDisplay');

    $.ajax({
      url: '/api/shoes/sold/' + id,
      type: 'POST',
      success: function(thenga) {
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
