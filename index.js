const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./config/db");
const userRouter = require("./route/user.route");
const bookRouter = require("./route/book.route")

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/book", bookRouter)

app.get("/",(req,res) => {
    res.status(200).send("Health check.")
})

app.listen(port, async() => {
    try{
        await connection;
        console.log(`Server is running on port ${port} and DB is connected.`)
    }catch(err){
        console.log(err)
    }
})