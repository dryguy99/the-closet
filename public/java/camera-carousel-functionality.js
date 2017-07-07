var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  video.src = window.URL.createObjectURL(stream);
  video.play();
  });
}


function download(){
  context.drawImage(video, 0, 0, 300, 300);
  var download = document.getElementById("download");
  var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  setTimeout(saveImage,1000)
}



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


function SwipeCarosel(){
   $("#myCarousel").swiperight(function() {  
      $("#myCarousel").carousel('prev');  
    });  
   $("#myCarousel").swipeleft(function() {  
      $("#myCarousel").carousel('next');  
   });  
}