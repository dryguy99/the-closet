
var index=0;


function DisplayImage(data){
  var shirtsArray = data[0];
  var pantsArray  = data[1];
  var shoesArray  = data[2];
  var noImage= '<div class="item active"><div class="col-xs-4"><h3>Please insert an image</h3></div></div>';
  var itemActive = '<div class="item active"><div class="col-xs-4">';
  var item = '<div class="item"><div class="col-xs-4">';
  var  delHover= '<div class="middle"><div class="text">Delete</div></div></div>';

         ////////IF NO IMAGES IN THE CAROUSEL////
      if(shirtsArray.length==0){$('#Carosel1').html(noImage);}
      if(pantsArray.length==0){$('#Carosel2').html(noImage);}
      if(shoesArray.length==0){$('#Carosel3').html(noImage);}

        ////////CAROUSEL 1////
      for(var i = 0; i < shirtsArray.length; i++){
          (function(i){
            $.get('/uploads/' + shirtsArray[i].filename).done(function(imgData){
          console.log('i is ' + i);
          if(i===0){

              $('#Carosel1')
              .append(itemActive+'<img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/>'+delHover)
                //.append('<div class="item active"><div class="col-xs-4"><img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
          }
          else{

               $('#Carosel1')
                 //.append('<div class="item"><div class="col-xs-4"><img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
                .append(item+'<img data-id="'+shirtsArray[i].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/>'+delHover)
              }
            })
          })(i)
        };
          ////////CAROUSEL 2////
        for(var j = 0; j < pantsArray.length; j++){
          (function(j){
            $.get('/uploads/' + pantsArray[j].filename).done(function(imgData){
                 console.log('j is ' + j);
          if(j===0){

              $('#Carosel2')
                    //.append('<div class="item active"><div class="col-xs-4"><img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
                     .append(itemActive+'<img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="pants"/>'+delHover)
          }
          else{

               $('#Carosel2')
                    .append(item+'<img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="pants"/>'+delHover)
                   // .append('<div class="item"><div class="col-xs-4"><img data-id="'+pantsArray[j].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
               //.append('<div class="item"><div class="col-xs-4"><img src="data:image/jpeg;base64,'+imgData+'" class="img-responsive"></div></div>');
              }     
            })
          })(j)
        };
        ////////CAROUSEL 3////
        for(var k = 0; k < shoesArray.length; k++){
          (function(k){
            $.get('/uploads/' + shoesArray[k].filename).done(function(imgData){
             console.log('k is ' + k);
                
          if(k===0){

              $('#Carosel3')
               .append(itemActive+'<img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shoes"/>'+delHover)
                 // .append('<div class="item active"><div class="col-xs-4"><img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
          }

          else{
               $('#Carosel3')
                .append(item+'<img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shoes"/>'+delHover)
                //.append('<div class="item"><div class="col-xs-4"><img data-id="'+shoesArray[k].filename+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/><div class="middle"><div class="text">Delete</div></div></div>');
              }               
            })
          })(k)
        };
  setTimeout(caroselFunction, 500);
  }
  


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

$(document).on("click", ".wear", function(){
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
  console.log("hello")
  // $('#test1').removeClass('col-md-12');
  // $('#test2').removeClass('col-md-12');
  // $('#test3').removeClass('col-md-12');
  $(".small").removeClass('.col-md-1');
  // $('#test2').addClass('col-md-9');
  // $('#test1').addClass('col-md-9');
  // $('#test3').addClass('col-md-9');
  $("#post").show();
  var imageID = $(this).attr("data-id");
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

//////save an outfit
$(document).on("click", "#sidebar-save", function() {
var shirtID = $("#shirts").attr("data-id")
var pantsID = $("#pants").attr("data-id")
var shoesID = $("#shoes").attr("data-id")
      $.ajax({
        method: "POST",
        url: "/single",
        data: {
          shirts:shirtID,
          pants:pantsID,
          shoes:shoesID
        }
      })
      .done(function(data){
        $("#modal-message").html("Your Outfit has been saved")
        $("#myModal").modal("toggle");
        $("#sidebar-shoes").empty();
        $("#sidebar-pants").empty();
        $("#sidebar-shirts").empty();
        $("#post").hide();
        // $('#test1').removeClass('col-md-9');
        // $('#test2').removeClass('col-md-9');
        // $('#test3').removeClass('col-md-9');
        // $('#test1').addClass('col-md-12');
        // $('#test2').addClass('col-md-12');
        // $('#test3').addClass('col-md-12');
      });
})


/////DELETE AN IMAGE
$(document).on("click", ".middle", function() {
  var thisId = $(this).parent().children('img')[0].attributes[0].nodeValue;
  console.log(thisId)
    $.ajax({
      method: "POST",
      url: "/delete/"+ thisId,
           })
          .done(function(data) {
              $("#modal-message").html("Your Image is Deleted")
              $("#myModal").modal("toggle");
              $("#Carosel2").empty();
              $("#Carosel1").empty();
              $("#Carosel3").empty();
              //refer to camera-funtionality.js
              setTimeout(AutomaticClose,1350);
              setTimeout(DisplayImage(data),1350);
          });
});