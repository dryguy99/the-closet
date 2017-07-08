
var Geo={};
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