var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var fs = require("fs");
var morgan       = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session      = require('express-session');

//fix cors errors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
mongoose.Promise = Promise;


if (!process.env.MONGODB_URI){

        mongoose.connect("mongodb://localhost/img");
    }
    else{
        mongoose.connect(process.env.MONGODB_URI)
    }
require('./config/passport')(passport); // pass passport for configuration
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())// parse application/json
app.set('view engine', 'ejs'); // set up ejs for templating
app.use('/', express.static("./public"));
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    name: "K-Closet",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
var db= mongoose.connection;
app.use(flash()); // use connect-flash for flash messages stored in session
  db.on("error", function(error){
  console.log("Mongoose Error",error)
  });
  db.once("open", function(error){
  console.log("Mongoose Rocks")
  });
// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require("./routes/images.js")(app);
require("./routes/outfits.js")(app);

app.listen(port, function() {
  console.log("The Magic happens on port "+ port);
});
