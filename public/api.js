var ShoeTemplate = document.getElementById('ShoeTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(ShoeTemplate);

var shoeDisplay = document.getElementById('shoeDisplay');
var addingStock = document.getElementById('addingStock');

var addStockBtn = document.getElementById("addStock")
var searchBtn = document.getElementById('searchBtn');
var brandInput = document.getElementById('shoe-brand').value;

console.log('SEARCH BTN', searchBtn);
console.log('addStock BTN', addStockBtn);

function getAllShoe() {
  var shoeDisplay = document.getElementById('shoeDisplay');


  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(data) {
      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase
      })

      shoeDisplay.innerHTML = shoesHtml;

    },
    error: function(error) {
      alert('error found : ' + error);


    },

  })
}
getAllShoe();

//function postAShoe() {
addStock.addEventListener('click', function() {

  var addButton = document.querySelector('#addStock');

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

  //console.log(shoeCarrier);

  $.ajax({
    url: '/api/shoes',
    type: 'POST',
    data: shoeCarrier,
    dataType: 'application/json',
    success: function(postAShoe) {

      console.log('Succefully added the shoe' + postAShoe);

      // shoeDisplay.innerHTML = myTemplateInstance({
      //
      //   console.log('Succefully added the shoe')
      //
      // })
    },
    error: function(error) {
      alert('error found : ' + error);


    },
  })
  getAllShoe();
})

console.log('*****', tempContainer);

// tempContainer.addEventListener('click', function() {
function filters() {

  var tempContainer = document.querySelector('#tempContainer');
  var brandFilter = document.getElementById('brandDrpDwn');
  var colorFilter = document.getElementById('colorDrpDwn');
  var sizeFilter = document.getElementById('sizeDrpDwn');
  var pricFilter = document.getElementById('priceDrDwn');
  var searchBtn = document.getElementById('searchBtn');

function brands(select){
  return brandFilter.value==select.brand;
}

function sizes(select){
  return sizeFilter.value==select.size;
  return brandFilter.value==select.brand;
}
function sizes(select){
  return sizeFilter.value==select.size;
}



  // console.log('######', searchBtn);
  // // Get values from dropdowns (Search params)
  // var brandShoe = {
  //   brandInput: brandInput.value
  // }
  // console.log(brandInput);

  // Make AJAX call with values to url
  $.ajax({
    url: '/api/shoes/brand/',
    type: 'GET',

  }).then(function(results){
if(brandFilter.value!=""){
  console.log(brandFilter.value);
   var shoes=results.filter(brands);
      var tempBrand = myTemplateInstance({
        shoes: results
      })

      shoeDisplay.innerHTML = tempBrand;
}
    })

    //
    // $.ajax({
    //   url: '/api/shoes/brand/size'+sizeFilter.value,
    //   type: 'GET',
    //
    //   success: function(results) {
    // if(brandFilter.value!=""){
    // console.log(brandFilter.value);
    //  var shoes=results.filters(brands);
    //     var tempBrand = myTemplateInstance({
    //       shoes: results.shoeBox
    //     })
    //
    //     shoeDisplay.innerHTML = tempBrand;
    // }
    //   },
    //





    // error: function(error) {
    //   alert('error found : ' + error);
    //
    //
    // },


  getAllShoe();
}
//   var searchButton=document.getElementById('searching');
// var shoeDisplay = document.getElementById('shoeDisplay');
//
