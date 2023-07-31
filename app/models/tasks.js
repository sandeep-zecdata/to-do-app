const mongoose = require("mongoose");
// const Joi = require('joi');

const TaskSchema = mongoose.Schema({
     
    task:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
  
})

module.exports = mongoose.model("Task",TaskSchema,"tasks");