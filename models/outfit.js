var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var OutfitSchema = new Schema({
      Matches:Array,
      //matches2: {type: String},
    shirtsMatch: {type: String},
    pantsMatch: {type: String},
	 shoesMatch: {type: String},
   userId: {type: String},
 	 outfitId: {type: String},
	 id:{type: Schema.Types.ObjectId}
});

var Outfit = mongoose.model("Outfit", OutfitSchema);

module.exports = Outfit;
