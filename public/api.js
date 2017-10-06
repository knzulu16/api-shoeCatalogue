var ShoeTemplate = document.getElementById('ShoeTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(ShoeTemplate);
var shoeDisplay = document.getElementById('shoeDisplay');
var addingStock = document.getElementById('addingStock');

var addStockBtn = document.getElementById("addStock");
// var searchBtn = document.getElementById('searchBtn');
var brandInput = document.getElementById('shoe-brand').value;
// console.log('SEARCH BTN', searchBtn);
// console.log('addStock BTN', addStockBtn);
var allShoes=[];
var allShoeObj={};
// displays all the shoes
function getAllShoe() {
  var shoeDisplay = document.getElementById('shoeDisplay');

  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(data) {
      console.log(data.shoeCase);
      var brandMap =[];
      data.shoeCase.forEach(function(curr){
        if(brandMap.indexOf(curr.brand)==-1){
          brandMap.push(curr.brand);
        }
      });
      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase,
        brandMap
      })

    allShoes=data.shoeCase;
    shoeDisplay.innerHTML = shoesHtml;

    }
    // error: function(error) {
    //   alert('error found : ' + error);
    //
    //
    // },

  })
}
getAllShoe();

//function postAShoe() {
// add the shoes to the database
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

// console.log('*****', tempContainer);

//
// var filterBrand = document.querySelector('#filterBrand');


// var url = "http://localhost:3000/api/shoes/brand/"
//searchBtn.addEventListener('click',
// filtering by brand
function filter() {
  // alert("I work");
  // $.get("/api/shoes/brand", function(brand) {

  var brandTemplate = document.querySelector('.brandTemplate');
  var shoeDisplay = document.getElementById('shoeDisplay');
  var selectBrand = document.querySelector('#brandDrpDwn')
  var colorFilter = document.querySelector('#colorDrpDwn');
  var sizeFilter = document.querySelector('#sizeDrpDwn');
  var priceFilter = document.querySelector('#priceDrDwn');
  var brandOpt = document.getElementById('brandOpt');
  var filter = document.querySelector('.filter');

  // console.log(filter);

  // function filterBrand(){

  var brand = {
    brand: selectBrand.options[selectBrand.selectedIndex].text
  }

// console.log(selectBrand);
console.log(selectBrand.options[selectBrand.selectedIndex].text);
  $.ajax({
    url: " /api/shoes/brand/" + brand.brand,

    type: 'GET',
    data: brand,
    dataType: 'json',
    success: function(results) {

      // var brands=[];
      //    var brandMap={};
      //    for(var i=0;i<results.length;i++){

      var tempBrand = myTemplateInstance({
        shoes: results.brand,

      })

      shoeDisplay.innerHTML = tempBrand
    }

})
}
// var filter = document.querySelector('.filter');
// $('#sizeDrpDwn').on('click', function(){
// filtering by size
function filterSize() {
  // alert('vhbjhnkm')
  var searDrop = document.querySelector('#sizeDrpDwn');
  console.log(searDrop);
  var shoeDisplay = document.getElementById('shoeDisplay');
  var sizeDrpDwn = document.querySelector('#sizeDrpDwn');
  var sizeTemplate = document.querySelector('.sizeTemplate');
  //
  var size = {
    size: sizeDrpDwn.value
  }

  $.ajax({
    url: " /api/shoes/size/" + size.size,
    type: 'GET',
    data: size,
    dataType: 'json',
    success: function(sizeParam) {
      console.log(sizeParam);
      var tempSize = myTemplateInstance({
        shoes: sizeParam.size
      })
      shoeDisplay.innerHTML = tempSize;
    }
  })

}

// $('#searchBtn').on('change',function(){
//
// })


function purchaseShoe(id) {

  // var buyTarg = document.querySelector('#shoePur').value;
  var buyDisplay = document.querySelector('#buyDisplay');
  console.log(buyDisplay);
  var shoeDisplay = document.getElementById('shoeDisplay');



  $.ajax({
    url: '/api/shoes/sold/' + id,
    type: 'POST',
    success: function(thenga) {
allShoes.forEach(function(shoe){
  if(shoe._id==thenga.data._id){
    shoe.in_stock=thenga.data.in_stock;
  }
})
      var buyShoe = myTemplateInstance({
        shoes: allShoes
      })

      shoeDisplay.innerHTML = buyShoe;

    }

  })
}

// get rid of brands duplicates calls
// function getDuplBrands(){
//
//   $ajax({
//     url:'/api/shoes/brand',
//     type:'GET',
//     success:function(data){
// console.log("//////", data.brands);
//     var tempBrand = myTemplateInstance({
//     brandData: data
//     })
//
//       shoeDisplay.innerHTML = tempBrand;
//     }
//   })
//   // console.log("]]]]]]]]]]", tempBrand);
// }
// getDuplBrands()
// get rid of sizes duplicates
// function getDuplSize(){
//
//   $ajax({
//     url:'/api/shoes/size',
//     type:'GET',
//     success:function(res){
// var tempSize=myTemplateInstance({
//      shoes:res.sizes
//    })
//    shoeDisplay.innerHTML=tempSize;
//     }
//   })
//
// }





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


//  getAllShoe();
// })
// })
