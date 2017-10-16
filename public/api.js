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



// displays all the shoes & get rid of duplicates in size and brand, populating dropdowns
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
        brandMap: brandMap.sort("A-Z")
      });
      document.querySelector('#sizeDrpDwn').innerHTML += sizeTempInstance({
        sizeMap: sizeMap.sort("1-100")
      });


      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase,
        brandMap,
        sizeMap
      })

      shoeDisplay.innerHTML = shoesHtml;

      allShoes = data.shoeCase;

    }

  })
}
getAllShoe();

// add shoes
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


  })
  getAllShoe();
})



var brandDisplay = document.getElementById('brandDisplay');
var sizeDisplay = document.getElementById('sizeDisplay');



function filterbyBrand() {

  var divDrop = document.querySelector('.col-sm-4');
  var brandTemplate = document.querySelector('#brandTemplate');
  var selectBrand = document.getElementById('brandDrpDwn').value;


  $.ajax({
    url: '/api/shoes/brand/' + selectBrand,
    type: 'GET',

    success: function(reslts) {

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

  $.ajax({
    url: '/api/shoes/size/' + Selectsize,
    type: 'GET',
    dataType: 'json',
    data: 'size',
    success: function(product) {
    

      var table = myTemplateInstance({
        shoes: product.size

      })

      shoeDisplay.innerHTML = table;
    }

  })


}









// buy shoe function
function purchaseShoe(id, stock) {

console.log(stock);

  var buyDisplay = document.querySelector('#buyDisplay');

  var shoeDisplay = document.getElementById('shoeDisplay');

if (stock < 1) {
  getAllShoe();
} else {
  $.ajax({
    url: '/api/shoes/sold/' + id,
    type: 'POST',
    success: function(thenga) {

      // window.location.reload();
      console.log(thenga);
      if (thenga.status = "removed") {
        getAllShoe()
      } else {
        allShoes.forEach(function(shoe) {
          if (shoe._id == thenga.data._id) {
            shoe.in_stock = thenga.data.in_stock;
          }
        })
      }
          //   var buyShoe = myTemplateInstance({
    //     shoes: allShoes
    //   })
    //   shoeDisplay.innerHTML = buyShoe;
    // }
  }
  })
}
}
