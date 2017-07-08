
//$("#file").hide();
$("#change").hide();
$("#change2").hide();
$("#modal-message").css("text-align","center")
$("#modal-message2").css("text-align","center")

function modal(){
  $("#file").trigger("click");
}

function saveImage(){
  $("#avatar").trigger("click");
}

function AutomaticClose(){
  $("#change").trigger("click");
  }


function AutomaticModal2(){
  $("#change2").trigger("click");
  }


function AutomaticSend(){
    $("#modal-message").html("Please Submit all Requirements");
    $("#myModal").modal("toggle");
}
  // var file= $("#avatar").val()
  // var checkbox1a=  $("#type-align").children()[0].checked
  // var checkbox1b=  $("#type-align").children()[1].checked
  // var checkbox1c= $("#type-align").children()[2].checked

  // var checkbox2a=  $("#wear-align").children()[0].checked
  // var checkbox2b=  $("#wear-align").children()[1].checked
  // var checkbox2c= $("#wear-align").children()[2].checked

  // var checkbox3a=  $("#season-align").children()[0].checked
  // var checkbox3b=  $("#season-align").children()[1].checked
  // var checkbox3c= $("#season-align").children()[2].checked

  //  console.log($("#type-align").children()[0].checked)

  //   if(checkbox1a==false && checkbox1b==false && checkbox1c==false){
  //     $("#modal-message").html("Please Submit all Requirements");
  //     $("#myModal").modal("toggle");
  //     $("#file").show();
  //      return false;
  //   }
  //   if(checkbox2a==false && checkbox2b==false && checkbox2c==false){
  //     $("#modal-message").html("Please Submit all Requirements");
  //     $("#myModal").modal("toggle");
  //     $("#file").show();
  //      return false;
  //   }
  //   if(checkbox3a==false && checkbox3b==false && checkbox3c==false){
  //     $("#modal-message").html("Please Submit all Requirements");
  //     $("#myModal").modal("toggle");
  //     $("#file").show();
  //      return false;
  //   }
  //   /////IF NO FILE CANCEL FORM/////
  //   if(file.length>1){
  //     console.log("HEY")
  //     // $("#modal-message").html("Your Image is Saved")
  //     $("#modal-message").html("Please Submit all Requirements");
  //     $("#myModal").modal("toggle");
  //     return true;
  //     //setTimeout(modal,1350)
  //   }






// $(document).on("click", "#file", function() {
//    $("#myModal").modal("toggle");
//   $("#modal-message").html("Your Image is Saved")
//   })
