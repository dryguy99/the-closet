// oauth.js
// display login options
const loginInfo = '<p>Login or Register with:</p><a data-name="login" class="tbtn btn btn-default btn-success"><span class="fa fa-user"></span> Local Login</a><a data-name="signup" class="tbtn btn btn-default btn-success"><span class="fa fa-user"></span> Local Signup</a><a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Facebook</a><a href="/auth/twitter" class="btn btn-info"><span class="fa fa-twitter"></span> Twitter</a><a href="/auth/google" class="btn btn-danger"><span class="fa fa-google-plus"></span> Google</a>';

// display user info after logging in
const profileInfo = '';

// check to see if user us already logged in
function checkUser() {
  $.get('/user').done(function(response) {
    console.log(response);
    if (response) {
      //display profile page
      $('#navmodal1').html('<a onclick="userLogout()">Logout</a>');
      return true;
    } else{
      //display login options
      $('#navmodal1').html('<a id="navmodal" onclick="checkUser()" data-toggle="modal" data-target=".bs-modal-lg">Login</a>');
      $('#tlogin').html(loginInfo);
      return false;
    }
  });
}

function userLogout() {
  // console.log("userlogout");
  // data = [shirtsArray=[1],
  // pantsArray=[1],
  // shirtsArray=[1],
  // messageArray=["Please Log In"]];
  // DisplayImage(data);
  $("#Carosel2").empty();
 $("#Carosel1").empty();
 $("#Carosel3").empty();
 
  $.get('./logout').done( function() {
    window.location.replace("http://localhost:3000");
  });

     $.ajax({
        method: "GET",
        url: "/all",

      }).done(function(data) {
        data.length==4;
      DisplayImage(data);
      // console.log(data.length)
      console.log(data)
      })



}

//listen for login method and respond with appropriate info
$('.modal').on('click',".tbtn", function() {
  var method = $(this).attr('data-name');
  switch (method) {
    case 'login':
      $('#tlogin').load('/login');
      break;
    case 'signup':
      $('#tlogin').load('/signup').done(function(err,res){
        console.log("signup response: " + res);
      });
      break;
    case 'facebook':
      $.get('/auth/facebook').done(function(err,res){
        console.log("facebook response: " + res);
      });
      break;
    case 'twitter':
      $('#tlogin').load('/auth/twitter').done(function(err,res){
        console.log("twitter response: " + res);
      });
      break;
    case 'google':
      $.get('/auth/google').done(function(err,res){
        console.log("google response: " + res);
      });
      break;
  }

});

$('.modal').on('click',"#tsubmit", function() {
  event.preventDefault();
  var pass = $('#password').value;
  var email = $('#email').value;
  console.log('Name: ' + pass + ' Email: ' + email);
  $.post('/login',{email: email, password: pass}, function(err,res){
    console.log("res: " + res + " err: " + err);
    $('#tlogin').html(err);
  });
});

$(document).ready(function () {
checkUser();



});