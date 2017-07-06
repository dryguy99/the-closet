var newdata;
var index=0;
var Geo={};
var outfitArray=[];

////////////////////////////////DISPLAY IMAGES FUNCTION///////////////////////////////////////////

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
console.log(data)
console.log(data[0].outfitId)


  var noImage= '<div class="item active"><div class="col-xs-4"><h3>Save an Outfit from your closet</h3></div></div>'
  //var outfitArray1 = data[0];
  //var pantsArray  = data[1];
  //var shoesArray  = data[2];


          if(data.length==0){
                $('#Carosel1')
                     .html(noImage);
              }

          for(var i = 0; i < data.length; i++){
          //  for(j=0;j<data[i].Matches.length;j++){
              //console.log(data[i].Matches[j]);
          (function(i){   
              //(function(j){
                $.get('/uploads/' + data[i].Matches[0]).done(function(imgData1){
                //console.log('i is ' + i);
                //$("#outfit").append('<div data-id="'+data[i].outfitId+'" class="col-xs-6"><img src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div>');
              //})

                $.get('/uploads/' + data[i].Matches[1]).done(function(imgData2){
               // $("#outfit").append('<div data-id="'+data[i].outfitId+'" class="col-xs-6"><img src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div>');
             // })

                $.get('/uploads/' + data[i].Matches[2]).done(function(imgData3){
                // $("#outfit").append('<div data-id="'+data[i].outfitId+'" class="col-xs-6"><img src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div>');

 $("#outfit").append('<div data-id="'+data[i].outfitId+'" class="col-xs-6"><img src="data:image/jpeg;base64,'+ imgData1 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData2 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData3 + '"class="img-responsive center-block" value="shirts"/> </div>');

              })
              })
              })
              })(i)
           // })(i)
              };
              }                       





              //if(j===0){

              //     $('#Carosel1')
              //       .append('<div class="item active"><div data-id="'+data[i].outfitId+'" class="col-xs-4"><img src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div></div>');
              // }
              // else{
              //      $('#Carosel1')
              //        .append('<div class="item"><div class="col-xs-4"><img data-id="'+data[i].outfitId+'"src="data:image/jpeg;base64,'+ imgData + '"class="img-responsive center-block" value="shirts"/></div></div>');
              //     }





     // setTimeout(caroselFunction, 500);




$(document).ready(function(){Get();})
$(document).on("click", "#all-images", function() { Get();})


function Get(){
$("#Carosel1").empty();
    $.ajax({
        method: "GET",
        url: "/single"
      }).done(function(data) {
            DisplayImage(data);
      })
  }



$(document).on("click", "img", function() {

  // $('#test1').removeClass('col-md-12');
  // $('#test2').removeClass('col-md-12');
  // $('#test3').removeClass('col-md-12');
  // $('#test2').addClass('col-md-9');
  // $('#test1').addClass('col-md-9');
  // $('#test3').addClass('col-md-9');
  // $("#post").show();
  // var imageID = $(this).attr("data-id")
  // var name= $(this).attr("value")
  
  // if(name==="shirts"){sideImage(imageID,name)}
  // if(name==="pants"){sideImage(imageID,name)}
  // if(name==="shoes"){sideImage(imageID,name)}

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










