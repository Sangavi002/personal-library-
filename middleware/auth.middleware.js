const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if(!token) {
        res.status(404).send("You are not authenticated. Please login first.")
    }
    try{
        const decoded = jwt.verify(token, process.env.JWt_SECRET);
        console.log(decoded);
        req.body.userId = decoded.id;
        req.body.userName = decoded.username;
        next()
    }catch(err){
        res.status(404).send("You are not authenticated.")
    }
}

module.exports = auth