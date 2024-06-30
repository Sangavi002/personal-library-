const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req,res) => {
    const {username,email, password} = req.body
    try{
        bcrypt.hash(password,10,async(err, hash) => {
            if(err){
                res.status(404).send("Something went wrong.")
            }else{
                const user = await UserModel({username,email, password:hash});
                await user.save();
                res.status(200).send({"msg": "New user is registered."})
            }
        })
    }catch(err){
        res.status(404).send({"msg": "Fail to register."})
    }
}

const login = async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err, result) => {
                if(err){
                    res.status(404).send("Something went wrong.")
                }if(result){
                    let token = jwt.sign({id: user._id, username: user.username},process.env.JWT_SECRET);
                    res.status(200).send({"msg": "Logged In successfully.", "Token": token})
                }else{
                    res.status(404).send({"msg": "Wrong password"})
                }
            })
        }else{
            res.status(404).send({"msg": "Wrong crendentails."})
        }
    }catch(err){
        res.status(404).send({"msg": "Login is failed."})
    }

}

module.exports ={register, login}