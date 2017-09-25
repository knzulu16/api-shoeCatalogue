

var brands = document.getElementsByName('Brand');
var colors = document.getElementsByName('Color');
var sizes = document.getElementsByName('Size');
var Price=document.getElementsByName('Price');

var shoes=[
{
  Brand:"",
  Color:"",
  Size:"",
  Price:""
}



];


var myTemplate= document.querySelector('#myTemplate').innerHTML;
var myTemplateInstance = Handlebars.compile(myTemplate);
var results = myTemplateInstance({shoes:shoes});
document.querySelector('.shoeDisplay').innerHTML += results;
