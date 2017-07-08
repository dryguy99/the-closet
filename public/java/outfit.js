var newdata;
var index=0;
var Geo={};
var outfitArray=[];

////////////////////////////////DISPLAY IMAGES FUNCTION///////////////////////////////////////////
function DisplayImage(data){
  console.log(data)
  console.log(data[0].outfitId)
  var noImage= '<div class="item active"><div class="col-xs-4"><h3>Save an Outfit from your closet</h3></div></div>';
  var itemActive = '<div class="item active"><div class="col-xs-4">';
  var item = '<div class="item"><div class="col-xs-4">';
  var delHover2= '<div class="middle"><div class="text">Delete</div></div></div>';
  var delButton= '<button id="del-out"> Delete</button>';

          if(data.length==0){
                $('#Carosel1')
                     .html(noImage1);
              }

      for(var i = 0; i < data.length; i++){
          (function(i){
                $.get('/uploads/' + data[i].Matches[0]).done(function(imgData1){
                $.get('/uploads/' + data[i].Matches[1]).done(function(imgData2){
                $.get('/uploads/' + data[i].Matches[2]).done(function(imgData3){
            if(i===0){

              $('#Carosel1')
                .append(itemActive+'<div data-id="'+data[i].outfitId+'" matches="'+data[i].Matches+'" ><img src="data:image/jpeg;base64,'+ imgData1 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData2 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData3 + '"class="img-responsive center-block" value="shirts"/>'+delHover2)

              }
              else{

               $('#Carosel1')
               .append(item+'<div data-id="'+data[i].outfitId+'" matches="'+data[i].Matches+'"><img src="data:image/jpeg;base64,'+ imgData1 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData2 + '"class="img-responsive center-block" value="shirts"/><img src="data:image/jpeg;base64,'+ imgData3 + '"class="img-responsive center-block" value="shirts"/>'+delHover2)
              }
              })
           })
        })
      })(i)
    };
 setTimeout(caroselFunction, 500);
}


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

/////DELETE AN IMAGE
$(document).on("click", ".middle", function() {
  //var matchId =$(this).children()[0].attributes[0].value
  var thisId = $(this).parent()[0].attributes[0].values;
  console.log(thisId)
    $.ajax({
      method: "POST",
      url: "/erase/"+thisId,
           })
          .done(function(data) {
              $("#modal-message").html("Your Outfit has been Deleted")
              $("#myModal").modal("toggle");
              $("#Carosel1").empty();
              //refer to camera-funtionality.js
              setTimeout(AutomaticClose,1350);
              setTimeout(DisplayImage(data),1350);
          });
});
