const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {type: String, require: true}, 
    author: {type: String, require: true},
    genre: {type: String, require: true},
    status: {type:String,require: true},
    created : {type: String, require: true},
},{
    versionKey: false
})

const BookModel = mongoose.model("book",bookSchema);

module.exports = BookModel;