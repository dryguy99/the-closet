var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var ImageSchema = new Schema({
      //fieldname: {type: String},
      //originalname: {type: String},
      //encodng: {type: String},
      //mimetype: {type: String},
      filename: {type: String},
      //size: {type: Number},
      path:{type:String},
      type: String,
      wear: String,
      userId:String,
      //outfitMatches:Array,
      //outfitId:String,
      season: String,
      data: Buffer,
      id:{type: Schema.Types.ObjectId}
});

// Create the Model
var Image = mongoose.model("Image", ImageSchema);

// Export it for use elsewhere
module.exports = Image;
