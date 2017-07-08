var newdata;
var index=0;
var Geo={};
var outfitArray=[];







//////////////////////////////////////////WEATHER API///////////////////////////////////////////
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success);
}
else {
alert('Geolocation is not supported');
}

function success(position) {
      Geo.lat = position.coords.latitude;
      Geo.lng = position.coords.longitude;
      console.log(Geo.lat)
var key ="e37b6970552858ff";
var Weather = "http://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";
      $.ajax({
      url : Weather,
      dataType : "jsonp",
      success : function(data) {
              console.log(data)
              var location =data['location']['city'];
              var temp = data['current_observation']['temp_f'];
              var img = data['current_observation']['icon_url'];
              var desc = data['current_observation']['weather'];
              var wind = data['current_observation']['wind_string'];
              $('#location').html(location);
              $('#temp').html(temp+"°");
              $('#desc').html(desc);
          }
     });
  }    
////////////////////////////////////////////END///////////////////////////////////////////////////

/////////FORM SUBMIT REJECT////////




// 
/////////END FORM SUBMIT REJECT////////

$("#avatar").on("click", function() {
   $("#error-message").html("");
})

$('form').on("submit", trythis)
  function trythis(){
  $("#error-message").empty();
  // event.preventDefault();
  var pass= $("#avatar").val() || "";
  if(pass.length<4){
    console.log("HELLO")
    $("#error-message").html("Please Select a file");
    return false;
  }
  else{
     $("#error-message").empty();
    console.log($("input[name='file']").val())

    return true;
  }
}




////////////////////////////////DISPLAY IMAGES FUNCTION WITH CAROUSELS///////////////////////////////////////////

 function caroselFunction(){
    $('.multi-item-carousel').carousel({
      interval: false
    });
    $('.multi-item-carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  };




 


function DisplayImage(data){
  var noImage= '<div class="item active"><div class="col-xs-4"><h3>Please insert an image</h3></div></div>'
  var shirtsArray = data[0];
  var pantsArray  = data[1];
  var shoesArray  = data[2];
          if(shirtsArray.length==0){
                $('#Carosel1')
                     .html(noImage);
              }
            if(pantsArray.length==0){
                $('#Carosel2')
                    .html(noImage);
              }
           if(shoesArray.length==0){
                $('#Carosel3')
                    .html(noImage);
              }
          for(var i = 0; i < shirtsArray.length; i++){
              (function(i){
                $.get('/uploads/' + shirtsArray[i].filename).done(function(imgData){
                    console.log('i is ' + i);
              if(i===0){

                  $('#Carosel1')
                    .append('<div class="item active"><div class="col-xs-4"><img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div></div>');
              }
              else{
                   $('#Carosel1')
                     .append('<div class="item"><div class="col-xs-4"><img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div></div>');
                  }
              })
              })(i)
              };
              for(var j = 0; j < pantsArray.length; j++){
              (function(j){

                $.get('/uploads/' + pantsArray[j].filename).done(function(imgData){

                     console.log('j is ' + j);
                    
              if(j===0){

                  $('#Carosel2')
                       .append('<div class="item active"><div class="col-xs-4"><img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="pants"/></div></div>');
              }
              else{

                   $('#Carosel2')
                       .append('<div class="item"><div class="col-xs-4"><img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="pants"/></div></div>');

                   //.append('<div class="item"><div class="col-xs-4"><img src="data:image/jpeg;base64,'+imgData+'" class="img-responsive"></div></div>');
                  }     
              })
              })(j)
              };
              for(var k = 0; k < shoesArray.length; k++){
              (function(k){
                $.get('/uploads/' + shoesArray[k].filename).done(function(imgData){
                     console.log('k is ' + k);
                    
              if(k===0){
                  $('#Carosel3')
                     .append('<div class="item active"><div class="col-xs-4"><img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shoes"/></div></div>');
              }
              else{
                   $('#Carosel3')
                    .append('<div class="item"><div class="col-xs-4"><img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shoes"/></div></div>');

                  }               
              })
              })(k)
              };
         // })
      setTimeout(caroselFunction, 500);
   }
////////////////////////////////END DISPLAY IMAGES FUNCTION WITH CAROUSELS///////////////////////////////////////////



////////////////////////////////OnClick Functions///////////////////////////////////////////////////////////////


$(document).ready(function(){Get();})
$(document).on("click", "#all-images", function() { Get();})

function Get(){
$("#Carosel2").empty();
$("#Carosel1").empty();
$("#Carosel3").empty();
    $.ajax({
        method: "GET",
        url: "/all"
      }).done(function(data) {
            DisplayImage(data);
      })
  }



$(document).on("click", ".wear", function() {
$("#Carosel2").empty();
$("#Carosel1").empty();
$("#Carosel3").empty();
var wearType = $(this).attr("value")
console.log("weartype " +wearType)
     $.ajax({
      method: "GET",
      url: "/wear/"+wearType
    }).done(function(data) {
      DisplayImage(data);
      console.log(data)
    })

})


$(document).on("click", ".season", function() {
$("#Carosel2").empty();
$("#Carosel1").empty();
$("#Carosel3").empty();
var season = $(this).attr("value")
console.log(season)
     $.ajax({
      method: "GET",
      url: "/season/"+season
    }).done(function(data) {
      DisplayImage(data);
    })

})


$(document).on("click", "img", function() {
  $('#test1').removeClass('col-md-12');
  $('#test2').removeClass('col-md-12');
  $('#test3').removeClass('col-md-12');
  $('#test2').addClass('col-md-9');
  $('#test1').addClass('col-md-9');
  $('#test3').addClass('col-md-9');
  $("#post").show();
  var imageID = $(this).attr("data-id")
  var name= $(this).attr("value")
  
  if(name==="shirts"){sideImage(imageID,name)}
  if(name==="pants"){sideImage(imageID,name)}
  if(name==="shoes"){sideImage(imageID,name)}

})




function sideImage(imageID,name){
  $("#post").css("background-color","none");
  $("#sidebar-close").empty();
  $("#sidebar-save").empty();
  $("#sidebar-clear").empty();
   $.get('/uploads/' +imageID).done(function(imgData){
      $("#sidebar-"+name).html('<div class="item"><div class="col-xs-12"><img id="'+name+'" data-id="'+imageID+'"src="data:image/jpeg;base64,'+ imgData + '"/></div></div>'); 
      $("#sidebar-save").append("'<div class='item'><div class='col-xs-12'><button id='save'>save outfit</button></div></div>")
      $("#sidebar-close").append("'<div class='item'><div class='col-xs-12'><button id='close'>close</button></div></div>")
       $("#sidebar-clear").append("'<div class='item'><div class='col-xs-12'><button id='clear'>clear</button></div></div>")
      $("#post").css("background-color","white")
})

}

$(document).on("click", "#sidebar-clear", function() {
  $("#sidebar-shoes").empty();
  $("#sidebar-pants").empty();
   $("#sidebar-shirts").empty();
})



$(document).on("click", "#sidebar-close", function() {
  $("#post").hide();
  $('#test1').removeClass('col-md-9');
  $('#test2').removeClass('col-md-9');
  $('#test3').removeClass('col-md-9');
  $('#test1').addClass('col-md-12');
  $('#test2').addClass('col-md-12');
  $('#test3').addClass('col-md-12');
})


var idArray=[];

$(document).on("click", "#sidebar-save", function() {

var shirtID = $("#shirts").attr("data-id")
var pantsID = $("#pants").attr("data-id")
var shoesID = $("#shoes").attr("data-id")
idArray[0]=shirtID;
idArray[1]=pantsID;
idArray[2]=shoesID;
//idArray[3]=outfitId;
 // for(var i=0;i<idArrray.length;i++){

  //(function(i){
     // outfitId;
      $.ajax({
      method: "POST",
      url: "/single",
     // data: JSON.stringify(idArray)
      data: {
         //matches: idArray
        //matches: JSON.stringify(idArray)
        shirts:shirtID,
        pants:pantsID,
        shoes:shoesID
        //outfitId
      }
         })
      .done(function(data) {
          //console.log(outfitId)
      });
//})(i)
  //}
})
