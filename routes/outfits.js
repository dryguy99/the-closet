var mongoose = require("mongoose");
var Image = require("../models/image.js");
var Outfit = require("../models/outfit.js");

var multer = require("multer");
var upload = multer({dest: "./uploads"});

var fs = require("fs");
var ImageArray=[];
var myfiles=[];
var base64data;
//var sharp = require('sharp');


module.exports=function(app){

app.post("/single",function(req,res){

  var NewOutfit = new Outfit ({
      shirtsMatch: req.body.shirts,
      pantsMatch: req.body.pants,
      shoesMatch: req.body.shoes,
      outfitId: Math.floor((Math.random() * 1000) + 1),
      Matches: [req.body.shirts, req.body.pants,req.body.shoes]
  });
      NewOutfit.save(function(err,doc){
          if (err){
          console.log('err: ' + error);
          res.json('error: there was an error');
          }
          else{
          console.log(doc)
          res.redirect("/")
          }
    })
});


app.get("/single",function(req,res){
  Outfit.find({}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        console.log(doc);
        res.send(doc)
      }
  })
})


app.get("/del", function(req, res) {
  Outfit.remove().exec(function(error,data){
       if(error){
          res.send(error)
        }
        else{
          res.send(data)
        }
     });
  })

}
