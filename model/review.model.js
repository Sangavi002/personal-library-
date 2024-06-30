const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    bookId : {type: String, require: true},
    userId : {type: String, require: true},
    review : {type: String, require: true},
    rating: {type: Number, require: true},
},{
    versionKey: false
})

const ReviewModel = mongoose.model("review",reviewSchema);

module.exports = ReviewModel;