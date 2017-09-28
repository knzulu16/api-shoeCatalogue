

$(function() {
  var shoeDisplay = document.getElementById('shoeDisplay');

  var myTemplate = document.getElementById('myTemplate').innerHTML;
  var myTemplateInstance = Handlebars.compile(myTemplate);

  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(data) {

      console.log(data.shoeCase);

      var shoesHtml = myTemplateInstance({
        shoes: data.shoeCase
      })

      shoeDisplay.innerHTML = shoesHtml;

    },
     error: function(error){
      alert('error found : ' + error);


},
      })
    })
