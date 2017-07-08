
$(document).on("click", "#video-button", function() {$("#video").show();})

$("#avatar").on("click", function() {$("#error-message").html("");})

/////////FORM SUBMIT REJECT////////
$('form').on("submit", trythis)
function trythis(){
  var pass= $("#avatar").val() || " ";
  var checkbox1a=  $("#type-align").children()[0].checked
  var checkbox1b=  $("#type-align").children()[1].checked
  var checkbox1c= $("#type-align").children()[2].checked

  var checkbox2a=  $("#wear-align").children()[0].checked
  var checkbox2b=  $("#wear-align").children()[1].checked
  var checkbox2c= $("#wear-align").children()[2].checked

  var checkbox3a=  $("#season-align").children()[0].checked
  var checkbox3b=  $("#season-align").children()[1].checked
  var checkbox3c= $("#season-align").children()[2].checked
   
   console.log($("#type-align").children()[0].checked)

    if(checkbox1a==false && checkbox1b==false && checkbox1c==false){
      $("#modal-message").html("Please Submit all Requirements");
      $("#myModal").modal("toggle");
      $("#file").show();
       return false;
    }
    if(checkbox2a==false && checkbox2b==false && checkbox2c==false){
      $("#modal-message").html("Please Submit all Requirements");
      $("#myModal").modal("toggle");
      $("#file").show();
       return false;
    }
    if(checkbox3a==false && checkbox3b==false && checkbox3c==false){
      $("#modal-message").html("Please Submit all Requirements");
      $("#myModal").modal("toggle");
      $("#file").show();
       return false;
      }
///////IF NO FILE CANCEL FORM/////
    if(pass<2 || pass.length<2){
      $("#error-message").empty();
      $("#error-message").html("Please Select a file");
       return false;
     }
//////PROCESS FORM/////
    else{
        return true;
      }
    }

