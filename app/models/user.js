const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, requried:true},
    role:{type:String, default:'customer'}
}, {timestamp:true})

module.exports=mongoose.model('user',userSchema);