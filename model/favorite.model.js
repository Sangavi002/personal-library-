const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    bookId : {type: String, require: true},
    userId : {type: String, require: true},
    marked : {type: Boolean, require: true},
},{
    versionKey: false
})

const FavoriteModel = mongoose.model("favorite",favoriteSchema);

module.exports = FavoriteModel;