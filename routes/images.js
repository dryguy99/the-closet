
var path = require("path");
var mongoose = require("mongoose");
var Image = require("../models/image.js");
var Outfit = require("../models/outfit.js");
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var fs = require("fs");
var shoesArray=[];
var shirtsArray=[];
var pantsArray=[];
var BigArray=[];


module.exports=function(app){
///////////////////MAKE ARRAYS TO PACKAGE TO THE FRONT END
  function MakeArray(data){
       shoesArray=[];
       shirtsArray=[];
       pantsArray=[];
       BigArray=[];
        for(i=0;i<data.length;i++){
            if(data[i].type=== "shirts"){
              shirtsArray.push(data[i]);
            }
            else if(data[i].type=== "pants"){
              pantsArray.push(data[i]);
            }
            else{
              shoesArray.push(data[i]);
            }
        }
        BigArray.push(shirtsArray);
        BigArray.push(pantsArray);
        BigArray.push(shoesArray);
  }

///////MULTIPLE UPLOADS////FIND OUT HOW TO DISPLAY}
  app.post("/", upload.array('file', 4) , function(req, res, next){
    console.log("req.user: " + req.user);
      for(i=0;i<req.files.length;i++){

        var NewImage= new Image ({
          type: req.body.type,
          wear:req.body.wear,
          season:req.body.season,
          filename:req.files[i].filename,
          userId: req.user._id
        })
        NewImage.save(function(err,doc){
          if (err){
          console.log('err: ' + err);
          }
          else{
         console.log(doc);
          }
        })
      }
     res.redirect("/")
});
/////////////////////////////////////////////////

app.get("/one",function(req,res){
  console.log(req.user._id)
    Image.find({userId: req.user._id}).exec(function(error,data){
    var ImageArray=[];
      for(i=0;i<data.length;i++){
            var image = {
            path: data[i].path,
            filename: data[i].filename,
            }
        ImageArray.push(image)
      }
      res.send(ImageArray);
   })
})

///////////////////GRAB ALL THE IMAGES
app.get("/all",function(req,res){
  //console.log(req.user._id)
    Image.find({userId: req.user._id}).exec(function(error,data){
       MakeArray(data);
       res.send(BigArray);
       //console.log(BigArray)
   })
})

///////////////////GRAB THE IMAGES BY TYPE
app.get("/wear/:id",function(req,res){
    Image.find({wear:req.params.id,userId:req.user._id}).exec(function(error,data){
    MakeArray(data)
    res.send(BigArray);
    //console.log(BigArray)
})
})

///////////////////GRAB THE IMAGES BY SEASON
app.get("/season/:id",function(req,res){
   console.log(req.params.id)
   Image.find({season:req.params.id,userId:req.user._id}).exec(function(error,data){
      MakeArray(data);
      res.send(BigArray);
      //console.log(BigArray)
  })

})

///////////////////DELETE THE IMAGES
app.get("/delete", function(req, res) {
  Image.remove().exec(function(error,data){
     if(error){
        res.send(error)
      }
      else{
        res.send(data)
      }
   });
})

///////////////////DELETE ONE IMAGE
app.post("/delete/:id", function(req, res) {
  console.log(req.params.id)
  fs.unlinkSync("./uploads/"+req.params.id);
  Image.remove({filename:req.params.id}).exec(function(error,data){
     if(error){
        res.send(error)
      }
   });
   Image.find({}).exec(function(error,data){
       MakeArray(data);
       res.send(BigArray);
   })
})





///////////////////////////////////////////OUTFITS////////////////////////////////






///////////////////OUTFITS PAGE
app.get("/outfits", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/outfits.html"));

});


///////////////////SAVE THE OUTFITS
app.post("/single",function(req,res){
  var NewOutfit = new Outfit ({
      userId: req.user._id,
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

///////////////////GRAB THE OUTFITS
app.get("/single",function(req,res){
  Outfit.find({userId:req.user._id}).exec(function(error,doc){
      if (error) {
       console.log(error)
      }
      else {
        console.log(doc);
        res.send(doc);
      }
  })
})

///////////////////DELETE AN OUTFIT
app.post("/erase/:id", function(req, res) {
  console.log(req.params.id)
  Outfit.remove({userId:req.user._id, outfitId:req.params.id}).exec(function(error,data){
     if(error){
        res.send(error)
      }
   });
   Outfit.find({userId:req.user._id}).exec(function(error,data){
       //MakeArray(data);
       res.send(data);
   })
})


///////////////////DELETE THE OUTFITS
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


///////////////////////////////////FILE SYESTEM ///////////////////////
///////////////////GRAB THE IMAGES
app.get("/uploads/:id",function(req,res){

    console.log("REQ " + req.params.id)
    fs.readFile("./uploads/"+req.params.id, function(err, imageData){
        if(err){
          console.log(err+ "ERRRRRRRR");
        }else{
          var base64data = new Buffer(imageData, 'binary').toString('base64');
          res.set({'Content-Type':'image/jpeg'});
          res.send(base64data);
        }
    })
})

}////MODULE END///////
