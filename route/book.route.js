const express = require("express");
const bookRouter = express.Router();
const BookModel = require("../model/book.model");
const auth = require("../middleware/auth.middleware");
const UserModel = require("../model/user.model");
const FavoriteModel = require("../model/favorite.model");

bookRouter.post("/createBook", auth, async(req, res) => {
    const {title, author, genre, status} = req.body
    try{
        const book = new BookModel({title, author, genre,status, created: req.body.userId});
        await book.save();
        res.status(200).send({"msg": "New Book is created."})
    }catch(err){
        res.status(200).send({"msg": "Fail to create a book."})
    }
})

bookRouter.get("/allBook",auth,async(req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";

    try{
        let query = {};
        
        if(search){
            query= {
                $or: [
                    {title: {$regex : search, $options: "i"}},
                    {author: {$regex : search, $options: "i"}},
                ]
            }
        }

        if(status){
            query.status = status;
        }
        const skip = (page -1) *limit;

        let book = await BookModel.find(query).skip(skip).limit(limit);

        const totalCount = await BookModel.countDocuments(query);

        const totalPages = Math.ceil(totalCount/limit);

        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            hasNextpage: page < totalPages,
            hasPrevPage: page > 1,
            totalItems: totalCount,
            itemsPerPage: limit,
        }
        res.status(200).send({book, pagination})
    }catch(err){
        console.log(err);
        res.status(404).send("Internal Server Error")
    }
    
   
})

bookRouter.patch("/updateBook/:bookId", auth, async(req, res) => {
    const {title, author, genre,status} = req.body
    const {bookId} = req.params;
    try{
        const book = await BookModel.findOne({_id:bookId});

        if(!book){
            res.status(404).send("Book not found.");
        }

        if(book.created == req.body.userId){
            await BookModel.findByIdAndUpdate({_id: bookId},{$set: {title,author,genre,status}});
            res.status(200).send({"msg": "Book updated successfully."});
        }else{
            res.status(404).send({"msg": "Unauthorised to update book."});
        }
    }catch(err){
        res.status(404).send({"msg": "Error in updating book."});
    }
})

bookRouter.delete("/deleteBook/:bookId", auth, async(req, res) => {
    const {title, author, genre} = req.body
    const {bookId} = req.params;
    try{
        const book = await BookModel.findOne({_id:bookId});

        if(!book){
            res.status(404).send("Book not found.");
        }

        if(book.created == req.body.userId){
            await BookModel.findByIdAndDelete({_id: bookId});
            res.status(200).send({"msg": "Book deleted successfully."});
        }else{
            res.status(404).send({"msg": "Unauthorised to delete book."});
        }
    }catch(err){
        res.status(404).send({"msg": "Error in deleting book."});
    }
})

bookRouter.post("/favortieBook", auth, async(req, res) => {
    const {bookId, marked} = req.body

    try{

        const filter = { bookId: bookId, userId: req.body.userId};
        const update = {marked: marked};

        const options = { upsert: true, new: true, setDefaultOnInsert: true};

        const favorite = await FavoriteModel.findOneAndUpdate(filter, update, options);
        res.status(200).send({"msg": "Marked favorite status"})
    }catch(err){
        console.log(err)
        res.status(200).send({"msg": "Fail to mark favorite"})
    }
})


module.exports = bookRouter;
