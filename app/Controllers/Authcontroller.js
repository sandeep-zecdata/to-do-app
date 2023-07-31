 
const User = require("../models/users");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
   
     const password = await bcrypt.hash(req.body.password,saltRounds)
     const data = {...req.body,password}
     const user = await User.create(data);
    res.status(201).json({message:"user created successfully"});
}

exports.login = async (req,res) => {

    const user = await User.findOne({user_name:req.body.user_name});
    if(!user){
        res.status(404).json({error:"user not found"});
        return;
    }

    if(!(await bcrypt.compare(req.body.password, user.password))){
        res.status(404).json({error:"invalid username or password!"});
        return;
    }

    const token = await jwt.sign({user}, 'token');
    res.json({user,accessToken:token});
}