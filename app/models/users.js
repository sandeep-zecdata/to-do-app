const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
     password:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("User",UserSchema,"users");